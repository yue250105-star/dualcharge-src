import React, { useState } from 'react';
import {
  Check,
  CheckCheck,
  HeartHandshake,
  Inbox,
  Send,
} from 'lucide-react';
import { useDualCharge } from '@/src/context/DualChargeContext';
import { NotificationStatus, PartnerId } from '@/src/types/dualcharge';

interface NotificationsPageProps {
  partnerId: PartnerId;
  scope?: 'demo' | 'normal';
}

function StatusLabel({ status, label }: { status: NotificationStatus; label: string }) {
  if (status === 'Completed') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3D5E49] shrink-0">
        <CheckCheck className="w-3.5 h-3.5 text-[#8FA89B]" strokeWidth={2.2} />
        <span>{label}</span>
      </span>
    );
  }
  if (status === 'Received') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C45E4E] shrink-0">
        <Check className="w-3.5 h-3.5 text-[#E88C7D]" strokeWidth={2.2} />
        <span>{label}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#706794] shrink-0">
      <Send className="w-3 h-3 text-[#9B93B8]" strokeWidth={2} />
      <span>{label}</span>
    </span>
  );
}

function NormalNotificationsContent() {
  const { normalUser, normalInteractions, setNormalActivePage, t } = useDualCharge();
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('sent');

  const sentList = normalInteractions.notifications;
  const senderName = normalUser.nickname || 'You';
  const partnerName = t.normalMode.partnerDisplayName;

  return (
    <div className="space-y-4 pb-2">
      <div>
        <h1 className="font-display text-[20px] font-semibold tracking-tight text-[#292832]">
          {t.notifications.title}
        </h1>
        <p className="text-[12.5px] text-[#85838D] mt-0.5">{t.notifications.subtitle}</p>
      </div>

      <div
        role="tablist"
        aria-label={t.notifications.title}
        className="grid grid-cols-2 gap-1 p-1 bg-[#F4EFEA] rounded-2xl"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'received'}
          onClick={() => setActiveTab('received')}
          className={`min-h-[38px] rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 px-2 ${
            activeTab === 'received'
              ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
              : 'text-[#85838D] hover:text-[#292832]'
          }`}
        >
          <span>{t.notifications.receivedTab}</span>
          <span className="text-[11px] text-[#85838D] tabular-nums">(0)</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'sent'}
          onClick={() => setActiveTab('sent')}
          className={`min-h-[38px] rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 px-2 ${
            activeTab === 'sent'
              ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
              : 'text-[#85838D] hover:text-[#292832]'
          }`}
        >
          <span>{t.notifications.sentTab}</span>
          <span className="text-[11px] text-[#85838D] tabular-nums">({sentList.length})</span>
        </button>
      </div>

      {activeTab === 'received' || sentList.length === 0 ? (
        <div className="bg-white/85 backdrop-blur-[10px] rounded-[22px] p-6 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] text-center space-y-2.5">
          <div className="w-12 h-12 rounded-2xl bg-[#F4EFEA] flex items-center justify-center mx-auto text-[#85838D]">
            <Inbox className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div className="font-display text-[14.5px] font-semibold text-[#292832]">
            {activeTab === 'received'
              ? t.notifications.emptyReceivedTitle
              : t.notifications.emptySentTitle}
          </div>
          <p className="text-[12px] text-[#85838D] leading-relaxed max-w-[240px] mx-auto">
            {activeTab === 'received'
              ? t.notifications.emptyReceivedBody
              : t.notifications.emptySentBody}
          </p>
          <button
            type="button"
            onClick={() => setNormalActivePage('care')}
            className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 py-2 rounded-2xl bg-[#F5E8E7] hover:bg-[#EEDAD8] text-[#B45A4C] text-[12px] font-semibold transition-all duration-200 active:scale-95"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{t.notifications.exploreAiCare}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[11px] text-[#85838D] px-0.5">
            {t.normalMode.notificationsOutgoingOnlyNote}
          </p>
          {sentList.map((notif) => {
            const localizedSuggestion = t.normalMode.careSuggestions[notif.suggestionId];
            const suggestionTitle = localizedSuggestion?.title ?? '';
            const messageText =
              notif.customMessage && notif.customMessage.length > 0
                ? notif.customMessage
                : localizedSuggestion?.defaultMessage ?? '';

            return (
              <article
                key={notif.id}
                className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-[11px] text-[#85838D] min-w-0">
                    <span className="font-semibold text-[#292832]">{senderName}</span>
                    {' → '}
                    <span className="font-semibold text-[#292832]">{partnerName}</span>
                    <span aria-hidden="true"> · </span>
                    <span>
                      {notif.dateISO} · {notif.timeLabel}
                    </span>
                  </div>
                  <StatusLabel
                    status={notif.status}
                    label={t.notifications.statuses[notif.status]}
                  />
                </div>

                <div>
                  <div className="text-[11px] font-medium text-[#706794]">
                    {t.notifications.relatedSuggestion} {suggestionTitle}
                  </div>
                  <p className="text-[13px] text-[#292832] leading-relaxed mt-1.5 bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
                    “{messageText}”
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PresentationNotificationsContent({ partnerId }: { partnerId: PartnerId }) {
  const {
    presentationBundle,
    notifications,
    updateNotificationStatus,
    setActivePage,
    t,
  } = useDualCharge();

  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  if (!presentationBundle) {
    return (
      <div className="py-12 text-center text-[13px] text-[#85838D]">
        {t.welcome.loadingPresentationDemo}
      </div>
    );
  }

  const receivedList = notifications.filter((n) => n.recipient === partnerId);
  const sentList = notifications.filter((n) => n.sender === partnerId);
  const displayed = activeTab === 'received' ? receivedList : sentList;
  const unreadReceived = receivedList.filter((n) => n.status === 'Sent').length;

  return (
    <div className="space-y-4 pb-2">
      <div>
        <h1 className="font-display text-[20px] font-semibold tracking-tight text-[#292832]">
          {t.notifications.title}
        </h1>
        <p className="text-[12.5px] text-[#85838D] mt-0.5">{t.notifications.subtitle}</p>
      </div>

      <div
        role="tablist"
        aria-label={t.notifications.title}
        className="grid grid-cols-2 gap-1 p-1 bg-[#F4EFEA] rounded-2xl"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'received'}
          onClick={() => setActiveTab('received')}
          className={`min-h-[38px] rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 px-2 ${
            activeTab === 'received'
              ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
              : 'text-[#85838D] hover:text-[#292832]'
          }`}
        >
          <span>{t.notifications.receivedTab}</span>
          <span className="text-[11px] text-[#85838D] tabular-nums">
            ({receivedList.length})
          </span>
          {unreadReceived > 0 && (
            <span className="text-[10px] font-bold text-[#D46B5B] tabular-nums">
              · {unreadReceived} {t.notifications.newCountSuffix}
            </span>
          )}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'sent'}
          onClick={() => setActiveTab('sent')}
          className={`min-h-[38px] rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 px-2 ${
            activeTab === 'sent'
              ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
              : 'text-[#85838D] hover:text-[#292832]'
          }`}
        >
          <span>{t.notifications.sentTab}</span>
          <span className="text-[11px] text-[#85838D] tabular-nums">({sentList.length})</span>
        </button>
      </div>

      {displayed.length === 0 ? (
        <div className="bg-white/85 backdrop-blur-[10px] rounded-[22px] p-6 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] text-center space-y-2.5">
          <div className="w-12 h-12 rounded-2xl bg-[#F4EFEA] flex items-center justify-center mx-auto text-[#85838D]">
            <Inbox className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div className="font-display text-[14.5px] font-semibold text-[#292832]">
            {activeTab === 'received'
              ? t.notifications.emptyReceivedTitle
              : t.notifications.emptySentTitle}
          </div>
          <p className="text-[12px] text-[#85838D] leading-relaxed max-w-[240px] mx-auto">
            {activeTab === 'received'
              ? t.notifications.emptyReceivedBody
              : t.notifications.emptySentBody}
          </p>
          <button
            type="button"
            onClick={() => setActivePage(partnerId, 'care')}
            className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 py-2 rounded-2xl bg-[#F5E8E7] hover:bg-[#EEDAD8] text-[#B45A4C] text-[12px] font-semibold transition-all duration-200 active:scale-95"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{t.notifications.exploreAiCare}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((notif) => {
            const senderName = presentationBundle.partnerProfiles[notif.sender].name;
            const recipientName = presentationBundle.partnerProfiles[notif.recipient].name;
            const localizedSuggestion = t.care.suggestions[notif.suggestionId];
            const suggestionTitle = localizedSuggestion?.title ?? '';
            const messageText =
              notif.customMessage && notif.customMessage.length > 0
                ? notif.customMessage
                : localizedSuggestion?.defaultMessage ?? '';
            const timePrefix = notif.isToday
              ? t.notifications.todayPrefix
              : t.notifications.yesterdayPrefix;

            return (
              <article
                key={notif.id}
                className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5 transition-shadow duration-300 hover:shadow-[0_14px_34px_-10px_rgba(41,40,50,0.09)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-[11px] text-[#85838D] min-w-0">
                    <span className="font-semibold text-[#292832]">{senderName}</span>
                    {' → '}
                    <span className="font-semibold text-[#292832]">{recipientName}</span>
                    <span aria-hidden="true"> · </span>
                    <span>
                      {timePrefix} · {notif.timeLabel}
                    </span>
                  </div>
                  <StatusLabel
                    status={notif.status}
                    label={t.notifications.statuses[notif.status]}
                  />
                </div>

                <div>
                  <div className="text-[11px] font-medium text-[#706794]">
                    {t.notifications.relatedSuggestion} {suggestionTitle}
                  </div>
                  <p className="text-[13px] text-[#292832] leading-relaxed mt-1.5 bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
                    “{messageText}”
                  </p>
                </div>

                {activeTab === 'received' && notif.status !== 'Completed' && (
                  <div className="flex items-center gap-2 pt-0.5">
                    {notif.status === 'Sent' && (
                      <button
                        type="button"
                        onClick={() => updateNotificationStatus(notif.id, 'Received', partnerId)}
                        className="flex-1 min-h-[42px] px-3 py-2 rounded-2xl bg-[#F5E8E7] hover:bg-[#EEDAD8] text-[#B45A4C] text-[12px] font-semibold transition-all duration-200 active:scale-95"
                      >
                        {t.notifications.markAsReceived}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => updateNotificationStatus(notif.id, 'Completed', partnerId)}
                      className="flex-1 min-h-[42px] px-3 py-2 rounded-2xl bg-[#8FA89B]/20 hover:bg-[#8FA89B]/30 text-[#3D5E49] text-[12px] font-semibold transition-all duration-200 active:scale-95"
                    >
                      {t.notifications.markAsCompleted}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function NotificationsPage({ partnerId, scope = 'demo' }: NotificationsPageProps) {
  if (scope === 'normal') {
    return <NormalNotificationsContent />;
  }
  return <PresentationNotificationsContent partnerId={partnerId} />;
}
