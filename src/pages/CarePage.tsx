import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  Check,
  Clock,
  Coffee,
  MessageCircleHeart,
  MoonStar,
  Pencil,
  Send,
  Sparkles,
} from 'lucide-react';
import { selectNormalCareSuggestions } from '@/src/data/normal/normalCare';
import { PRESENTATION_CARE_SUGGESTIONS } from '@/src/data/presentation/presentationConstants';
import { useDualCharge } from '@/src/context/DualChargeContext';
import { formatTemplate } from '@/src/i18n/translations';
import { CareSuggestion, NormalCareSuggestion, PartnerId } from '@/src/types/dualcharge';

interface CarePageProps {
  partnerId: PartnerId;
  scope?: 'demo' | 'normal';
}

function SuggestionIconBadge({ category }: { category: CareSuggestion['category'] }) {
  if (category === 'warmth') {
    return (
      <div className="w-10 h-10 rounded-2xl bg-[#F5E8E7] flex items-center justify-center shrink-0">
        <Coffee className="w-[18px] h-[18px] text-[#C45E4E]" strokeWidth={1.9} />
      </div>
    );
  }
  if (category === 'calm') {
    return (
      <div className="w-10 h-10 rounded-2xl bg-[#EFEDF5] flex items-center justify-center shrink-0">
        <MoonStar className="w-[18px] h-[18px] text-[#706794]" strokeWidth={1.9} />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-2xl bg-[#8FA89B]/18 flex items-center justify-center shrink-0">
      <MessageCircleHeart className="w-[18px] h-[18px] text-[#3D5E49]" strokeWidth={1.9} />
    </div>
  );
}

function NormalCareContent() {
  const {
    normalPairing,
    normalPreferences,
    normalBaseline,
    normalInteractions,
    saveNormalSuggestion,
    sendNormalCare,
    setNormalActivePage,
    t,
  } = useDualCharge();

  const suggestions = selectNormalCareSuggestions(
    normalPreferences.preferredCare,
    normalPreferences.avoidTags
  );
  const partnerDisplayName = t.normalMode.partnerDisplayName;
  const isPaired = normalPairing.status === 'paired_simulated';
  const isBuilding = normalBaseline.phase === 'building';

  const [editingId, setEditingId] = useState<string | null>(null);
  const [customDrafts, setCustomDrafts] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    kind: 'sent' | 'saved';
    title: string;
    showViewLink?: boolean;
  } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleSendCare = (suggestion: NormalCareSuggestion) => {
    const defaultMsg = t.normalMode.careSuggestions[suggestion.id]?.defaultMessage ?? '';
    const rawDraft = customDrafts[suggestion.id];
    const customMsg =
      rawDraft !== undefined && rawDraft.trim() !== '' && rawDraft.trim() !== defaultMsg.trim()
        ? rawDraft
        : undefined;

    sendNormalCare(suggestion, customMsg);
    setEditingId(null);
    setToast({
      kind: 'sent',
      title: formatTemplate(t.care.sentToastTitle, { name: partnerDisplayName }),
      showViewLink: true,
    });
  };

  const handleSaveSuggestion = (suggestion: NormalCareSuggestion) => {
    const localizedTitle = t.normalMode.careSuggestions[suggestion.id]?.title ?? '';
    const wasAdded = saveNormalSuggestion(suggestion);
    setToast({
      kind: 'saved',
      title: formatTemplate(wasAdded ? t.care.savedToastText : t.care.alreadySavedText, {
        title: localizedTitle,
      }),
      showViewLink: false,
    });
  };

  const toggleCustomize = (suggestion: NormalCareSuggestion) => {
    if (editingId === suggestion.id) {
      setEditingId(null);
      setCustomDrafts((prev) => {
        const next = { ...prev };
        delete next[suggestion.id];
        return next;
      });
      return;
    }
    setEditingId(suggestion.id);
    if (customDrafts[suggestion.id] === undefined) {
      setCustomDrafts((prev) => ({
        ...prev,
        [suggestion.id]: t.normalMode.careSuggestions[suggestion.id]?.defaultMessage ?? '',
      }));
    }
  };

  return (
    <div className="space-y-4 pb-2 relative">
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="sticky top-0 z-30 rounded-2xl bg-[#292832]/92 backdrop-blur-[10px] text-white px-3.5 py-2.5 shadow-[0_12px_28px_-8px_rgba(41,40,50,0.35)] flex items-center justify-between gap-2 text-[12px]"
        >
          <span className="flex items-center gap-2 min-w-0">
            <Check className="w-4 h-4 text-[#8FA89B] shrink-0" strokeWidth={2.3} />
            <span className="truncate font-medium">{toast.title}</span>
          </span>
          {toast.showViewLink && (
            <button
              type="button"
              onClick={() => {
                setToast(null);
                setNormalActivePage('notifications');
              }}
              className="text-[#E88C7D] font-semibold underline shrink-0 whitespace-nowrap active:scale-95 transition-transform"
            >
              {t.care.viewNotifications}
            </button>
          )}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-[20px] font-semibold tracking-tight text-[#292832]">
            {t.care.title}
          </h1>
          <span className="text-[11px] font-semibold text-[#8E4D42] bg-[#F5E8E7] px-2.5 py-0.5 rounded-xl">
            {formatTemplate(t.normalMode.dayBadgeTemplate, {
              day: normalBaseline.currentDayNumber,
            })}
          </span>
        </div>
        <p className="text-[12.5px] text-[#85838D] mt-0.5">{t.care.subtitle}</p>
      </div>

      {/* Cold-Start Context Card (no false predictions or Alex/Jamie data) */}
      <section
        aria-label={t.normalMode.careColdStartTitle}
        className="bg-white/85 backdrop-blur-[10px] ring-1 ring-white/80 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-start gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#EFEDF5] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#706794]" strokeWidth={2} />
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-[#706794]">
              {isBuilding
                ? t.normalMode.careSourcePreferenceBadge
                : t.normalMode.careSourceEarlyBaselineBadge}
            </div>
            <h2 className="font-display text-[14.5px] font-semibold text-[#292832] leading-snug">
              {t.normalMode.careColdStartTitle}
            </h2>
            <p className="text-[12px] text-[#85838D] leading-relaxed">
              {t.normalMode.careColdStartBody}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#292832]/[0.05] text-[11px] text-[#85838D] flex items-center justify-between gap-2">
          <span>
            {isBuilding
              ? t.normalMode.careContextWindowBuilding
              : t.normalMode.careContextWindowEarly}
          </span>
          <span className="font-semibold text-[#292832] shrink-0">
            {formatTemplate(t.normalMode.recordedDaysProgress, {
              count: normalBaseline.recordedDaysCount,
              target: normalBaseline.progressTargetDays,
            })}
          </span>
        </div>
      </section>

      {!isPaired && (
        <div className="rounded-2xl bg-[#EFEDF5]/60 px-3.5 py-2.5 text-[11.5px] text-[#5B527E] flex items-center justify-between gap-2">
          <span className="leading-snug">{t.normalMode.carePartnerNotPairedNote}</span>
          <button
            type="button"
            onClick={() => setNormalActivePage('profile')}
            className="text-[11px] font-semibold underline shrink-0 whitespace-nowrap"
          >
            {t.normalMode.invitePartnerCta}
          </button>
        </div>
      )}

      {/* Preference-Guided Suggestions */}
      <section aria-label={t.care.personalizedSuggestionsTitle} className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.care.personalizedSuggestionsTitle}
          </h2>
          <span className="text-[11px] text-[#85838D]">
            {t.normalMode.careSourcePreferenceBadge}
          </span>
        </div>

        {suggestions.map((suggestion) => {
          const localized = t.normalMode.careSuggestions[suggestion.id];
          if (!localized) return null;
          const isSaved = normalInteractions.savedSuggestionIds.includes(suggestion.id);
          const isEditing = editingId === suggestion.id;
          const draftValue = customDrafts[suggestion.id] ?? localized.defaultMessage;
          const isNonPurchase = suggestion.category === 'message';

          return (
            <article
              key={suggestion.id}
              className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
            >
              <div className="flex items-start gap-3">
                <SuggestionIconBadge category={suggestion.category} />
                <div className="min-w-0 flex-1">
                  <div className="text-[10.5px] font-medium text-[#706794] mb-0.5">
                    {isNonPurchase ? t.care.nonPurchaseTag : t.care.homeGestureTag} ·{' '}
                    {t.normalMode.careSourcePreferenceBadge}
                  </div>
                  <h3 className="font-display text-[15px] font-semibold text-[#292832] leading-snug">
                    {localized.title}
                  </h3>
                  <p className="text-[12.5px] text-[#292832]/85 mt-1 leading-relaxed">
                    {localized.description}
                  </p>
                </div>
              </div>

              <div className="bg-[#FDFBFA] rounded-2xl p-3 space-y-1.5 text-[11.5px] border border-[#292832]/[0.04]">
                <p className="text-[#292832]/85 leading-snug">
                  <span className="font-semibold text-[#292832]">{t.care.whyThisFits} </span>
                  {localized.reason}
                </p>
                <div className="flex items-center gap-1.5 text-[#85838D]">
                  <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.9} />
                  <span>
                    {t.care.suggestedTiming} {localized.timing}
                  </span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => toggleCustomize(suggestion)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#706794] hover:underline active:scale-95 transition-transform"
                >
                  <Pencil className="w-3 h-3" />
                  <span>{isEditing ? t.care.hideMessageEditor : t.care.editMessage}</span>
                </button>

                {isEditing && (
                  <div className="mt-2">
                    <label
                      htmlFor={`care-msg-normal-${suggestion.id}`}
                      className="block text-[11px] font-medium text-[#85838D] mb-1"
                    >
                      {formatTemplate(t.care.customMessageLabel, { name: partnerDisplayName })}
                    </label>
                    <textarea
                      id={`care-msg-normal-${suggestion.id}`}
                      rows={2}
                      value={draftValue}
                      onChange={(e) =>
                        setCustomDrafts((prev) => ({
                          ...prev,
                          [suggestion.id]: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl bg-[#FDFBFA] border border-[#292832]/10 p-2.5 text-[12px] text-[#292832] focus:outline-none focus:ring-2 focus:ring-[#E88C7D]"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => handleSendCare(suggestion)}
                  className="min-h-[44px] px-3 py-2 rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-[0_6px_16px_-6px_rgba(232,140,125,0.55)] transition-all duration-200 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  <span className="truncate">{t.care.sendCare}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveSuggestion(suggestion)}
                  aria-pressed={isSaved}
                  className={`min-h-[44px] px-3 py-2 rounded-2xl text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
                    isSaved
                      ? 'bg-[#EFEDF5] text-[#5B527E] ring-1 ring-[#9B93B8]/40'
                      : 'bg-[#F4EFEA] text-[#292832] hover:bg-[#EAE3DC]'
                  }`}
                >
                  {isSaved ? (
                    <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
                  ) : (
                    <Bookmark className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  )}
                  <span className="truncate">{isSaved ? t.care.saved : t.care.saveSuggestion}</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function PresentationCareContent({ partnerId }: { partnerId: PartnerId }) {
  const {
    presentationBundle,
    savedSuggestionIds,
    saveCareSuggestion,
    sendCareNotification,
    setActivePage,
    t,
  } = useDualCharge();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [customDrafts, setCustomDrafts] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    kind: 'sent' | 'saved';
    title: string;
    showViewLink?: boolean;
  } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!presentationBundle) {
    return (
      <div className="py-12 text-center text-[13px] text-[#85838D]">
        {t.welcome.loadingPresentationDemo}
      </div>
    );
  }

  const defaultRecipient: PartnerId = partnerId === 'alex' ? 'jamie' : 'alex';
  const recipientProfile = presentationBundle.partnerProfiles[defaultRecipient];
  const recipientMeta = presentationBundle.partnerMeta[defaultRecipient];
  const recipientCarePrefs = presentationBundle.partnerCarePrefs[defaultRecipient];

  const suggestions = PRESENTATION_CARE_SUGGESTIONS.filter(
    (s) => s.recipient === defaultRecipient && recipientCarePrefs.preferred_care.length > 0
  );
  const mySavedIds = savedSuggestionIds[partnerId];

  const handleSendCare = (suggestion: CareSuggestion) => {
    const defaultMsg = t.care.suggestions[suggestion.id]?.defaultMessage ?? '';
    const rawDraft = customDrafts[suggestion.id];
    const customMsg =
      rawDraft !== undefined && rawDraft.trim() !== '' && rawDraft.trim() !== defaultMsg.trim()
        ? rawDraft
        : undefined;

    sendCareNotification(partnerId, suggestion, customMsg);
    setEditingId(null);
    setToast({
      kind: 'sent',
      title: formatTemplate(t.care.sentToastTitle, { name: recipientMeta.display_name }),
      showViewLink: true,
    });
  };

  const handleSaveSuggestion = (suggestion: CareSuggestion) => {
    const localizedTitle = t.care.suggestions[suggestion.id]?.title ?? '';
    const wasAdded = saveCareSuggestion(partnerId, suggestion);
    setToast({
      kind: 'saved',
      title: formatTemplate(wasAdded ? t.care.savedToastText : t.care.alreadySavedText, {
        title: localizedTitle,
      }),
      showViewLink: false,
    });
  };

  const toggleCustomize = (suggestion: CareSuggestion) => {
    if (editingId === suggestion.id) {
      setEditingId(null);
      setCustomDrafts((prev) => {
        const next = { ...prev };
        delete next[suggestion.id];
        return next;
      });
      return;
    }
    setEditingId(suggestion.id);
    if (customDrafts[suggestion.id] === undefined) {
      setCustomDrafts((prev) => ({
        ...prev,
        [suggestion.id]: t.care.suggestions[suggestion.id]?.defaultMessage ?? '',
      }));
    }
  };

  return (
    <div className="space-y-4 pb-2 relative">
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="sticky top-0 z-30 rounded-2xl bg-[#292832]/92 backdrop-blur-[10px] text-white px-3.5 py-2.5 shadow-[0_12px_28px_-8px_rgba(41,40,50,0.35)] flex items-center justify-between gap-2 text-[12px]"
        >
          <span className="flex items-center gap-2 min-w-0">
            <Check className="w-4 h-4 text-[#8FA89B] shrink-0" strokeWidth={2.3} />
            <span className="truncate font-medium">{toast.title}</span>
          </span>
          {toast.showViewLink && (
            <button
              type="button"
              onClick={() => {
                setToast(null);
                setActivePage(partnerId, 'notifications');
              }}
              className="text-[#E88C7D] font-semibold underline shrink-0 whitespace-nowrap active:scale-95 transition-transform"
            >
              {t.care.viewNotifications}
            </button>
          )}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-[20px] font-semibold tracking-tight text-[#292832]">
            {t.care.title}
          </h1>
          <span className="text-[10.5px] text-[#85838D]">{t.meta.simulatedDemoData}</span>
        </div>
        <p className="text-[12.5px] text-[#85838D] mt-0.5">{t.care.subtitle}</p>
      </div>

      <section
        aria-label={t.care.defaultRecipient}
        className="bg-white/80 backdrop-blur-[10px] ring-1 ring-white/80 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center gap-3">
          <img
            src={recipientProfile.avatarUrl}
            alt={recipientMeta.display_name}
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[#E88C7D]/30 shrink-0"
          />
          <div className="min-w-0">
            <div className="text-[11px] font-medium text-[#85838D]">
              {t.care.defaultRecipient}
            </div>
            <div className="font-display text-[15.5px] font-semibold text-[#292832]">
              {recipientMeta.display_name}
            </div>
          </div>
        </div>

        <div className="pt-2.5 border-t border-[#292832]/[0.05] space-y-1.5 text-[12px]">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[#85838D] shrink-0">{t.care.predictedWindowLabel}</span>
            <span className="font-medium text-[#292832] text-right">
              {defaultRecipient === 'jamie' ? t.care.jamieWindow : t.care.alexWindow}
            </span>
          </div>
          <div className="text-[#292832]/90 leading-relaxed">
            <span className="text-[#85838D]">{t.care.reasonLabel} </span>
            {defaultRecipient === 'jamie' ? t.care.jamieReason : t.care.alexReason}
          </div>
        </div>
      </section>

      <section aria-label={t.care.personalizedSuggestionsTitle} className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.care.personalizedSuggestionsTitle}
          </h2>
          <span className="text-[11px] text-[#85838D]">
            {formatTemplate(t.care.forRecipient, { name: recipientMeta.display_name })}
          </span>
        </div>

        {suggestions.map((suggestion) => {
          const localized = t.care.suggestions[suggestion.id];
          const isSaved = mySavedIds.includes(suggestion.id);
          const isEditing = editingId === suggestion.id;
          const draftValue = customDrafts[suggestion.id] ?? localized.defaultMessage;
          const isNonPurchase = suggestion.category === 'message';

          return (
            <article
              key={suggestion.id}
              className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3 transition-shadow duration-300 hover:shadow-[0_14px_34px_-10px_rgba(41,40,50,0.09)]"
            >
              <div className="flex items-start gap-3">
                <SuggestionIconBadge category={suggestion.category} />
                <div className="min-w-0 flex-1">
                  <div className="text-[10.5px] font-medium text-[#85838D] mb-0.5">
                    {isNonPurchase ? t.care.nonPurchaseTag : t.care.homeGestureTag}
                  </div>
                  <h3 className="font-display text-[15px] font-semibold text-[#292832] leading-snug">
                    {localized.title}
                  </h3>
                  <p className="text-[12.5px] text-[#292832]/85 mt-1 leading-relaxed">
                    {localized.description}
                  </p>
                </div>
              </div>

              <div className="bg-[#FDFBFA] rounded-2xl p-3 space-y-1.5 text-[11.5px] border border-[#292832]/[0.04]">
                <p className="text-[#292832]/85 leading-snug">
                  <span className="font-semibold text-[#292832]">{t.care.whyThisFits} </span>
                  {localized.reason}
                </p>
                <div className="flex items-center gap-1.5 text-[#85838D]">
                  <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.9} />
                  <span>
                    {t.care.suggestedTiming} {localized.timing}
                  </span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => toggleCustomize(suggestion)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#706794] hover:underline active:scale-95 transition-transform"
                >
                  <Pencil className="w-3 h-3" />
                  <span>{isEditing ? t.care.hideMessageEditor : t.care.editMessage}</span>
                </button>

                {isEditing && (
                  <div className="mt-2">
                    <label
                      htmlFor={`care-msg-${partnerId}-${suggestion.id}`}
                      className="block text-[11px] font-medium text-[#85838D] mb-1"
                    >
                      {formatTemplate(t.care.customMessageLabel, {
                        name: recipientMeta.display_name,
                      })}
                    </label>
                    <textarea
                      id={`care-msg-${partnerId}-${suggestion.id}`}
                      rows={2}
                      value={draftValue}
                      onChange={(e) =>
                        setCustomDrafts((prev) => ({
                          ...prev,
                          [suggestion.id]: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl bg-[#FDFBFA] border border-[#292832]/10 p-2.5 text-[12px] text-[#292832] focus:outline-none focus:ring-2 focus:ring-[#E88C7D]"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => handleSendCare(suggestion)}
                  className="min-h-[44px] px-3 py-2 rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-[0_6px_16px_-6px_rgba(232,140,125,0.55)] transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#292832]"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  <span className="truncate">{t.care.sendCare}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveSuggestion(suggestion)}
                  aria-pressed={isSaved}
                  className={`min-h-[44px] px-3 py-2 rounded-2xl text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#9B93B8] ${
                    isSaved
                      ? 'bg-[#EFEDF5] text-[#5B527E] ring-1 ring-[#9B93B8]/40'
                      : 'bg-[#F4EFEA] text-[#292832] hover:bg-[#EAE3DC]'
                  }`}
                >
                  {isSaved ? (
                    <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
                  ) : (
                    <Bookmark className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  )}
                  <span className="truncate">{isSaved ? t.care.saved : t.care.saveSuggestion}</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export function CarePage({ partnerId, scope = 'demo' }: CarePageProps) {
  if (scope === 'normal') {
    return <NormalCareContent />;
  }
  return <PresentationCareContent partnerId={partnerId} />;
}
