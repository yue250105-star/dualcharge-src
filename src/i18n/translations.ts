import {
  AvoidTagKey,
  CheckInOption,
  CommunicationStyleKey,
  LanguageCode,
  NotificationStatus,
  OnboardingAvatarId,
  PreferredCareTagKey,
} from '@/src/types/dualcharge';

export interface TranslationDictionary {
  meta: {
    presentationSubtitle: string;
    partnerALabel: string;
    partnerBLabel: string;
    activePhone: string;
    resetDemo: string;
    resetConfirmTitle: string;
    resetConfirmBody: string;
    resetConfirmNote: string;
    cancel: string;
    confirmReset: string;
    simulatedDemoData: string;
    todayDateLabel: string;
  };
  nav: {
    home: string;
    insights: string;
    care: string;
    profile: string;
    notificationsAria: string;
  };
  greetings: {
    alex: string;
    jamie: string;
  };
  energyStates: {
    steady: string;
    moderate: string;
    low: string;
  };
  home: {
    connectedWith: string;
    myEnergy: string;
    partnerSharedEnergy: string;
    estimatedEnergyIndex: string;
    personalSpaceTag: string;
    sharedSpaceTag: string;
    sharingPaused: string;
    sharingPausedNote: string;
    todaysSummary: string;
    personalView: string;
    sleepDuration: string;
    sleepQuality: string;
    activity: string;
    selfReported: string;
    pendingCheckIn: string;
    hoursUnit: string;
    minutesUnit: string;
    partnerSharedContext: string;
    privacyControlled: string;
    partnerEnergyHiddenNotice: string;
    partnerDefaultPrivacyNotice: string;
    sleepLabel: string;
    activityLabel: string;
    dailyCheckIn: string;
    howAreYouFeeling: string;
    checkInOptions: Record<CheckInOption, { label: string; hint: string }>;
    checkInConfirmed: string;
    checkInPreservedNote: string;
    aiInsightPreview: string;
    insightPreviewAlex: string;
    insightPreviewJamie: string;
    viewInsights: string;
    recentCareActivity: string;
    openCare: string;
  };
  insights: {
    title: string;
    subtitle: string;
    myPatternTab: string;
    partnerSharedTab: string;
    sharedInsightsPausedTitle: string;
    sharedInsightsPausedBody: string;
    historicalTrendTitle: string;
    last60Days: string;
    dateRangeTapHint: string;
    thursdayDipTag: string;
    restReminderAnnotation: string;
    historicalBadge: string;
    forecastBadge: string;
    indexLabel: string;
    sleepShortLabel: string;
    sleepPrivateLabel: string;
    legendDailyEnergy: string;
    legendObservedThursdays: string;
    patternDetectionPrefix: string;
    alexNoPatternTitle: string;
    alexNoPatternNote: string;
    alexOverallAvgLabel: string;
    jamiePatternTitle: string;
    jamiePatternNote: string;
    overallAvgEnergy: string;
    thursdayAvgEnergy: string;
    thursdayObservations: string;
    prevDayAvgSleep: string;
    future7DayTitle: string;
    forecastRange: string;
    estimatedIndexColon: string;
    confidenceColon: string;
    confidenceLevels: {
      High: string;
      Moderate: string;
      Low: string;
    };
    forecastFooterLabel: string;
    whyIdentifiedTitle: string;
    observedHistoricalTitle: string;
    estimatedFutureTitle: string;
    alexEvidenceObserved: string[];
    alexEvidenceEstimated: string[];
    jamieEvidenceObserved: string[];
    jamieEvidenceEstimated: string[];
    viewCareSuggestions: string;
  };
  care: {
    title: string;
    subtitle: string;
    defaultRecipient: string;
    predictedWindowLabel: string;
    reasonLabel: string;
    jamieWindow: string;
    jamieReason: string;
    alexWindow: string;
    alexReason: string;
    personalizedSuggestionsTitle: string;
    forRecipient: string;
    whyThisFits: string;
    suggestedTiming: string;
    nonPurchaseTag: string;
    homeGestureTag: string;
    editMessage: string;
    hideMessageEditor: string;
    customMessageLabel: string;
    sendCare: string;
    saveSuggestion: string;
    saved: string;
    viewNotifications: string;
    sentToastTitle: string;
    savedToastText: string;
    alreadySavedText: string;
    suggestions: Record<
      string,
      {
        title: string;
        description: string;
        reason: string;
        timing: string;
        defaultMessage: string;
      }
    >;
  };
  notifications: {
    title: string;
    subtitle: string;
    receivedTab: string;
    sentTab: string;
    newCountSuffix: string;
    emptyReceivedTitle: string;
    emptyReceivedBody: string;
    emptySentTitle: string;
    emptySentBody: string;
    exploreAiCare: string;
    relatedSuggestion: string;
    markAsReceived: string;
    markAsCompleted: string;
    statuses: Record<NotificationStatus, string>;
    todayPrefix: string;
    yesterdayPrefix: string;
  };
  profile: {
    roles: {
      alex: string;
      jamie: string;
    };
    simulatedDemoProfile: string;
    languageSectionTitle: string;
    languageSectionDesc: string;
    languages: Record<LanguageCode, string>;
    coupleSettingsTitle: string;
    partnerName: string;
    demoPairingCode: string;
    connectionStatus: string;
    connectedStatusValue: string;
    dataSharingTitle: string;
    dataSharingDesc: string;
    energySummaryTitle: string;
    energySummaryDesc: string;
    sleepSummaryTitle: string;
    sleepSummaryDesc: string;
    activitySummaryTitle: string;
    activitySummaryDesc: string;
    cycleTitle: string;
    cycleDesc: string;
    sharingFeedbackOn: string;
    sharingFeedbackOff: string;
    carePreferencesTitle: string;
    carePreferencesDesc: string;
    newPreferencePlaceholder: string;
    addButton: string;
    removeTagAria: string;
    presetTags: Record<string, string>;
    membershipTitle: string;
    demoPricingProposal: string;
    freePlanTitle: string;
    freePrice: string;
    perMonth: string;
    freeBenefits: string[];
    premiumPlanTitle: string;
    premiumPrice: string;
    perCoupleMonth: string;
    premiumBenefits: string[];
    pricingProposalNote: string;
    explorePremium: string;
    premiumModalTitle: string;
    premiumModalBody: string;
    premiumModalDisclaimer: string;
    premiumConfirmButton: string;
    premiumConfirmedBanner: string;
    closePreview: string;
  };
  activityTemplates: {
    sentCare: string;
    savedCare: string;
    completedCare: string;
    seedSupportive: string;
    seedSavedEvening: string;
  };
  calendar: {
    weekdaysShort: string[];
    weekdaysFull: string[];
    monthsShort: string[];
    monthsFull: string[];
  };
  welcome: {
    headline: string;
    subtitle: string;
    startJourney: string;
    exploreDemo: string;
    demoFootnote: string;
    returnToWelcome: string;
    enterDemoMode: string;
    exitDemoMode: string;
    personalModeBadge: string;
    resumePersonalApp: string;
    loadingPresentationDemo: string;
  };
  onboarding: {
    stepCounter: string;
    back: string;
    continue: string;
    skipForNow: string;
    completeSetup: string;
    localSetupTag: string;
    step1: {
      title: string;
      subtitle: string;
      nicknameLabel: string;
      nicknamePlaceholder: string;
      nicknameRequiredError: string;
      avatarLabel: string;
      avatarOptions: Record<OnboardingAvatarId, string>;
      languageLabel: string;
    };
    step2: {
      title: string;
      subtitle: string;
      optionCreate: string;
      optionJoin: string;
      optionLater: string;
      createDesc: string;
      inviteCodeLabel: string;
      copyCode: string;
      copiedCode: string;
      partnerJoinedButton: string;
      partnerJoinedConfirmed: string;
      joinDesc: string;
      joinCodeLabel: string;
      joinCodePlaceholder: string;
      verifyCodeButton: string;
      invalidCodeError: string;
      pairingSuccessBanner: string;
      laterTitle: string;
      laterDesc: string;
      laterConfirmedBanner: string;
      pairingRequiredError: string;
      localSimulationNote: string;
    };
    step3: {
      title: string;
      subtitle: string;
      offByDefaultNote: string;
      privacyFootnote: string;
      cycleFutureBadge: string;
    };
    step4: {
      title: string;
      subtitle: string;
      preferredCareTitle: string;
      avoidTitle: string;
      communicationTitle: string;
      preferredCareOptions: Record<PreferredCareTagKey, string>;
      avoidOptions: Record<AvoidTagKey, string>;
      communicationOptions: Record<CommunicationStyleKey, string>;
    };
    step5: {
      title: string;
      subtitle: string;
      startBaselineTitle: string;
      startBaselineBody: string;
      day1Badge: string;
      zeroHistoryBadge: string;
      firstInsightBadge: string;
      futureIntegrationsNote: string;
      noHealthClaimNote: string;
      completeBaselineCta: string;
    };
  };
  normalMode: {
    greetingTemplate: string;
    partnerDisplayName: string;
    personalRoleLabel: string;
    dayBadgeTemplate: string;
    baselineBuildingBadge: string;
    earlyBaselineBadge: string;
    baselineStartingTitle: string;
    baselineStartingBody: string;
    firstInsightTimingNote: string;
    recordedDaysProgress: string;
    checkInSavesBaselineNote: string;
    noEnergyIndexYet: string;
    avgSelfReportedLabel: string;
    notEnteredYet: string;
    invitePartnerTitle: string;
    invitePartnerBody: string;
    invitePartnerCta: string;
    waitingForPartnerTitle: string;
    waitingForPartnerCheckInBody: string;
    pairedStatusValue: string;
    unpairedStatusValue: string;
    pairLaterActionHint: string;
    simulatePartnerJoinNow: string;
    noCareActivityYet: string;
    insightPreviewBuilding: string;
    insightPreviewEarly: string;
    insightsBuildingTitle: string;
    insightsBuildingBody: string;
    observedSoFarTitle: string;
    observedSoFarEmpty: string;
    selfReportedScaleNote: string;
    earlyInsightBadge: string;
    earlyInsightTitle: string;
    earlyInsightSubtitle: string;
    avgScoreLabel: string;
    scoreRangeLabel: string;
    dayTransitionsLabel: string;
    mostCommonFeelingLabel: string;
    variationNotes: {
      steady: string;
      fluctuating: string;
      low_reserve: string;
    };
    weeklyPatternTitle: string;
    notEnoughWeekdayRepeats: string;
    weeklyPatternRequirementNote: string;
    preliminaryWeeklyPatternBadge: string;
    preliminaryWeeklyPatternBody: string;
    futureEstimatesInactiveTitle: string;
    futureEstimatesInactiveBody: string;
    careColdStartTitle: string;
    careColdStartBody: string;
    careSourcePreferenceBadge: string;
    careSourceEarlyBaselineBadge: string;
    carePartnerNotPairedNote: string;
    careLocalSentNote: string;
    careSuggestions: Record<
      string,
      {
        title: string;
        description: string;
        reason: string;
        timing: string;
        defaultMessage: string;
      }
    >;
    careContextWindowBuilding: string;
    careContextWindowEarly: string;
    notificationsOutgoingOnlyNote: string;
    modeAndDemoTitle: string;
    modeAndDemoDesc: string;
    enterPresentationDemo: string;
    returnToWelcomeBtn: string;
    resetOnboardingBtn: string;
    resetOnboardingTitle: string;
    resetOnboardingBody: string;
    confirmResetOnboarding: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    meta: {
      presentationSubtitle: 'AI-Powered Couple Care Companion · Interactive Dual-Device Prototype',
      partnerALabel: 'PARTNER A',
      partnerBLabel: 'PARTNER B',
      activePhone: 'Active Phone',
      resetDemo: 'Reset Demo',
      resetConfirmTitle: 'Reset Demo Interactions?',
      resetConfirmBody:
        'This will clear newly sent care messages, reset notification statuses, clear saved suggestions, and restore default check-in and sharing preferences.',
      resetConfirmNote: 'Your current language selection will be preserved.',
      cancel: 'Cancel',
      confirmReset: 'Reset Demo',
      simulatedDemoData: 'Simulated Demo Data',
      todayDateLabel: 'Friday, 13 Nov 2026',
    },
    nav: {
      home: 'Home',
      insights: 'Insights',
      care: 'Care',
      profile: 'Profile',
      notificationsAria: 'Notifications',
    },
    greetings: {
      alex: 'Good morning, Alex',
      jamie: 'Good morning, Jamie',
    },
    energyStates: {
      steady: 'Steady',
      moderate: 'Moderate',
      low: 'Low',
    },
    home: {
      connectedWith: 'Connected with {partner}',
      myEnergy: 'My Energy',
      partnerSharedEnergy: "{partner}'s Shared Energy",
      estimatedEnergyIndex: 'Estimated Energy Index',
      personalSpaceTag: 'Private',
      sharedSpaceTag: 'Shared',
      sharingPaused: 'Sharing paused',
      sharingPausedNote: '{partner} turned off Energy Summary sharing in Profile.',
      todaysSummary: "Today's Summary",
      personalView: 'Personal view',
      sleepDuration: 'Sleep duration',
      sleepQuality: 'Sleep quality',
      activity: 'Activity',
      selfReported: 'Self-reported',
      pendingCheckIn: 'Pending check-in',
      hoursUnit: 'hours',
      minutesUnit: 'minutes',
      partnerSharedContext: "{partner}'s Shared Context",
      privacyControlled: 'Privacy controlled',
      partnerEnergyHiddenNotice:
        '{partner} has paused sharing their Energy Summary. Only explicitly authorized summaries are displayed.',
      partnerDefaultPrivacyNotice:
        "Showing shared energy summary only. Detailed sleep and activity data stay private on {partner}'s phone unless explicitly authorized.",
      sleepLabel: 'Sleep',
      activityLabel: 'Activity',
      dailyCheckIn: 'Daily Check-in',
      howAreYouFeeling: 'How are you feeling?',
      checkInOptions: {
        good: { label: 'Feeling Good', hint: 'Steady & capable' },
        tired: { label: 'A Bit Tired', hint: 'Need gentle pace' },
        rest: { label: 'Need Rest', hint: 'Low reserve today' },
      },
      checkInConfirmed: "Today's self-reported status updated to {status} ({time}).",
      checkInPreservedNote: '{count} historical records preserved (manual check-in, non-wearable).',
      aiInsightPreview: 'AI Insight Preview',
      insightPreviewAlex: 'Jamie has shown a recurring lower-energy pattern on Thursdays.',
      insightPreviewJamie: 'You have shown a recurring lower-energy pattern on Thursdays.',
      viewInsights: 'View Insights',
      recentCareActivity: 'Recent Care Activity',
      openCare: 'Open Care',
    },
    insights: {
      title: 'AI Insights',
      subtitle: 'Understand patterns. Anticipate tomorrow.',
      myPatternTab: 'My Pattern ({name})',
      partnerSharedTab: '{name} (Shared)',
      sharedInsightsPausedTitle: 'Shared Insights Paused',
      sharedInsightsPausedBody:
        '{name} has paused sharing their Energy Summary in Profile settings.',
      historicalTrendTitle: 'Historical Energy Trend',
      last60Days: 'Last 60 days',
      dateRangeTapHint: 'Sep 15 – Nov 13, 2026 · Tap any day to inspect',
      thursdayDipTag: 'Thursday dip',
      restReminderAnnotation: 'A Little More Rest on Thursdays',
      historicalBadge: 'Observed',
      forecastBadge: 'Estimated',
      indexLabel: 'Index',
      sleepShortLabel: 'Sleep',
      sleepPrivateLabel: 'Private',
      legendDailyEnergy: 'Daily Energy Index',
      legendObservedThursdays: 'Observed Thursdays (9)',
      patternDetectionPrefix: 'Pattern Detection · {name}',
      alexNoPatternTitle: 'No significant recurring low-energy weekday pattern detected.',
      alexNoPatternNote:
        'Your energy remains steady across weekdays based on simulated historical records.',
      alexOverallAvgLabel: 'Overall average energy (60d)',
      jamiePatternTitle: 'Recurring Thursday Energy Dip Detected',
      jamiePatternNote: 'These figures are derived from 60 days of simulated historical records.',
      overallAvgEnergy: 'Overall average energy',
      thursdayAvgEnergy: 'Thursday average energy',
      thursdayObservations: 'Thursday observations',
      prevDayAvgSleep: 'Prev-day avg sleep',
      future7DayTitle: 'Future 7-Day Estimate',
      forecastRange: 'Nov 14 – Nov 20',
      estimatedIndexColon: 'Estimated Energy Index:',
      confidenceColon: 'Confidence:',
      confidenceLevels: {
        High: 'High',
        Moderate: 'Moderate',
        Low: 'Low',
      },
      forecastFooterLabel: 'Pattern-based estimate — demo data',
      whyIdentifiedTitle: 'Why did the system identify this pattern?',
      observedHistoricalTitle: 'Observed historical data',
      estimatedFutureTitle: 'Estimated future values',
      alexEvidenceObserved: [
        '60 days of simulated energy entries show a steady range between 78 and 100 (mean 87.3).',
        'Previous-night sleep averaged 7.1 hours across all recorded weekdays.',
      ],
      alexEvidenceEstimated: [
        'Next 7 days remain in a steady 76–83 range based on historical consistency.',
        'Estimates reflect recent routine stability rather than guaranteed outcomes.',
      ],
      jamieEvidenceObserved: [
        'Across 9 observed Thursdays, recorded energy averaged 40.3 compared to an overall 60-day average of 67.6.',
        'Wednesday-night sleep preceding those Thursdays averaged 5.7 hours, roughly 0.9 hours shorter than other weeknights.',
      ],
      jamieEvidenceEstimated: [
        'Thursday, 19 November 2026 is estimated at 47 / 100 (Moderate confidence) based on repeating mid-week recovery patterns.',
        'This forecast is a pattern-based estimate to help plan lighter routines — not a guaranteed outcome or medical assessment.',
      ],
      viewCareSuggestions: 'View Care Suggestions',
    },
    care: {
      title: 'AI Care',
      subtitle: 'Small actions. Thoughtful moments.',
      defaultRecipient: 'Default Recipient',
      predictedWindowLabel: 'Predicted window:',
      reasonLabel: 'Reason:',
      jamieWindow: 'Thursday, 19 Nov 2026 · Afternoon & Evening',
      jamieReason:
        'Recurring Thursday energy dip pattern detected (estimated 47 / 100), often following shorter mid-week sleep.',
      alexWindow: 'This Evening · 6:30 PM – 9:00 PM',
      alexReason:
        'Steady weekly energy observed — a calm shared ritual supports evening wind-down and mutual connection.',
      personalizedSuggestionsTitle: 'Personalized Care Suggestions',
      forRecipient: 'For {name}',
      whyThisFits: 'Why this fits:',
      suggestedTiming: 'Suggested timing:',
      nonPurchaseTag: 'Non-purchase care',
      homeGestureTag: 'Thoughtful gesture',
      editMessage: 'Customize note',
      hideMessageEditor: 'Use default note',
      customMessageLabel: 'Care message to {name}',
      sendCare: 'Send Care',
      saveSuggestion: 'Save Suggestion',
      saved: 'Saved',
      viewNotifications: 'View Sent',
      sentToastTitle: 'Care sent to {name}',
      savedToastText: 'Saved "{title}" to your care list.',
      alreadySavedText: '"{title}" is already in your saved suggestions.',
      suggestions: {
        'care-jamie-warm-drink': {
          title: 'Prepare a Warm Drink',
          description: 'Offer Jamie a warm milk tea.',
          reason: "Matches Jamie's explicitly stated preference for warm milk tea.",
          timing: 'Thursday, 19 Nov · 4:00 PM',
          defaultMessage:
            'Thinking of your busy Thursday — would you like a warm milk tea waiting when you wrap up?',
        },
        'care-jamie-quiet-evening': {
          title: 'Plan a Quiet Evening',
          description: 'Suggest a relaxing dinner or quiet time at home.',
          reason: "Matches Jamie's preference for calm activities and a light dinner without crowds.",
          timing: 'Thursday, 19 Nov · 7:00 PM',
          defaultMessage:
            "Let's keep Thursday evening completely low-key — light dinner at home and zero errands.",
        },
        'care-jamie-gentle-checkin': {
          title: 'Send a Gentle Check-in',
          description: 'Share a short, supportive message with no pressure to reply quickly.',
          reason: "A non-purchase care option aligned with Jamie's preference for gentle check-ins.",
          timing: 'Thursday, 19 Nov · Midday',
          defaultMessage:
            'I thought you might appreciate a relaxing evening. Take it easy today!',
        },
        'care-alex-evening-walk': {
          title: 'Invite for an Evening Walk',
          description: 'Suggest an unhurried 20-minute walk around the neighborhood.',
          reason: "Matches Alex's preference for relaxed evening walks.",
          timing: 'This Evening · 6:30 PM',
          defaultMessage:
            'Want to take a slow evening walk together after dinner for some fresh air?',
        },
        'care-alex-fruit-tea': {
          title: 'Brew Warm Fruit Tea',
          description: 'Prepare a pot of fruit tea to unwind together.',
          reason: "Matches Alex's explicitly stated preference for fruit tea.",
          timing: 'Tonight · 8:30 PM',
          defaultMessage: 'Making a pot of fruit tea later tonight — saving a cup for you.',
        },
        'care-alex-supportive-note': {
          title: 'Send a Short Note',
          description: 'Share a brief, warm thank-you message.',
          reason: "A non-purchase care option matching Alex's preference for short supportive messages.",
          timing: 'Anytime Today',
          defaultMessage: "Appreciate how steady and thoughtful you've been this week. Thank you!",
        },
      },
    },
    notifications: {
      title: 'Notifications',
      subtitle: 'Care messages shared between you and your partner.',
      receivedTab: 'Received',
      sentTab: 'Sent',
      newCountSuffix: 'new',
      emptyReceivedTitle: 'No received care notes yet',
      emptyReceivedBody:
        'When your partner sends a care suggestion from their phone, it will appear right here.',
      emptySentTitle: 'No sent care notes yet',
      emptySentBody: 'Visit AI Care to send a thoughtful message or gesture to your partner.',
      exploreAiCare: 'Explore AI Care',
      relatedSuggestion: 'Related suggestion:',
      markAsReceived: 'Mark as Received',
      markAsCompleted: 'Mark as Completed',
      statuses: {
        Sent: 'Sent',
        Received: 'Received',
        Completed: 'Completed',
      },
      todayPrefix: 'Today',
      yesterdayPrefix: 'Yesterday',
    },
    profile: {
      roles: {
        alex: 'Partner A · Demo Account',
        jamie: 'Partner B · Demo Account',
      },
      simulatedDemoProfile: 'Simulated Demo Profile',
      languageSectionTitle: 'Language',
      languageSectionDesc: 'Updates both phones immediately and persists locally.',
      languages: {
        en: 'English',
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
      },
      coupleSettingsTitle: 'Couple Settings',
      partnerName: 'Partner name',
      demoPairingCode: 'Demo pairing code',
      connectionStatus: 'Connection status',
      connectedStatusValue: 'Connected · Shared Couple',
      dataSharingTitle: 'Data Sharing Preferences',
      dataSharingDesc:
        'You control which summaries {partner} can view on their phone. Changes apply immediately.',
      energySummaryTitle: 'Energy Summary',
      energySummaryDesc: 'Share your daily Estimated Energy Index',
      sleepSummaryTitle: 'Sleep Summary',
      sleepSummaryDesc: 'Share sleep duration and quality score',
      activitySummaryTitle: 'Activity Summary',
      activitySummaryDesc: 'Share daily active minutes',
      cycleTitle: 'Menstrual Cycle Information',
      cycleDesc: 'Optional · Reserved for a future release (inactive by default)',
      sharingFeedbackOn: '{label} is now visible to {partner}.',
      sharingFeedbackOff: '{label} is now hidden from {partner}.',
      carePreferencesTitle: 'Care Preferences',
      carePreferencesDesc: 'Personal preferences that shape thoughtful AI Care suggestions.',
      newPreferencePlaceholder: 'Add a care preference...',
      addButton: 'Add',
      removeTagAria: 'Remove {tag}',
      presetTags: {
        alex_short_messages: 'Short supportive messages',
        alex_evening_walks: 'Relaxed evening walks',
        alex_fruit_tea: 'Fruit tea',
        alex_no_surprise_visits: 'Avoid surprise visits',
        jamie_quiet_time: 'Quiet time',
        jamie_light_dinner: 'Light dinner',
        jamie_warm_milk_tea: 'Warm milk tea',
        jamie_gentle_checkins: 'Gentle check-ins',
        jamie_no_crowds: 'Avoid crowded activities after a busy day',
      },
      membershipTitle: 'Membership Plans',
      demoPricingProposal: 'Demo pricing proposal',
      freePlanTitle: 'Free',
      freePrice: 'HK$0',
      perMonth: '/ month',
      freeBenefits: ['Basic energy summaries', 'Basic insights', 'Limited care suggestions'],
      premiumPlanTitle: 'Couple Premium',
      premiumPrice: 'HK$28–38',
      perCoupleMonth: '/ couple / mo',
      premiumBenefits: [
        'Deeper historical pattern analysis',
        'More detailed future estimates',
        'Personalized care suggestions',
        'Historical care preference insights',
      ],
      pricingProposalNote: 'Illustrative HKD pricing — proposal for university demonstration',
      explorePremium: 'Explore Premium',
      premiumModalTitle: 'Couple Premium Overview',
      premiumModalBody:
        'One shared couple plan at a proposed rate of HK$28–38 per couple / month unlocks deeper 60-day pattern analysis, detailed 7-day forecasts, and preference-aware care ideas for both Alex and Jamie.',
      premiumModalDisclaimer:
        'Simulated membership preview — no real payments or subscriptions are processed.',
      premiumConfirmButton: 'Confirm Demo Preview',
      premiumConfirmedBanner:
        'Demo preview noted! In the live product, both partners share one Couple Premium plan.',
      closePreview: 'Close',
    },
    activityTemplates: {
      sentCare: '{actor} sent "{suggestion}" to {target}.',
      savedCare: '{actor} saved "{suggestion}".',
      completedCare: '{actor} marked "{suggestion}" as completed.',
      seedSupportive: 'Alex sent a supportive message to Jamie.',
      seedSavedEvening: 'Jamie saved a relaxing evening suggestion.',
    },
    calendar: {
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      monthsFull: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    welcome: {
      headline: 'Care Begins with Understanding.',
      subtitle: "Understand your partner's energy patterns and discover thoughtful ways to care.",
      startJourney: 'Start Your DualCharge Journey',
      exploreDemo: 'Explore Couple Demo',
      demoFootnote: 'Fresh Day 1 personal setup · Separate 60-day Alex & Jamie couple demo',
      returnToWelcome: 'Welcome',
      enterDemoMode: 'Couple Demo',
      exitDemoMode: 'Exit Demo',
      personalModeBadge: 'Personal View',
      resumePersonalApp: 'Continue as {name}',
      loadingPresentationDemo: 'Loading 60-day couple demonstration...',
    },
    onboarding: {
      stepCounter: 'Step {current} of {total}',
      back: 'Back',
      continue: 'Continue',
      skipForNow: 'Skip for now',
      completeSetup: 'Start Building My Energy Baseline',
      localSetupTag: 'Day 1 Personal Setup',
      step1: {
        title: "Let's get to know you.",
        subtitle:
          'Create your local profile. No phone number, password, or real health records are collected.',
        nicknameLabel: 'Your Name / Nickname',
        nicknamePlaceholder: 'Enter your name or nickname',
        nicknameRequiredError: 'Please enter a name or nickname to continue.',
        avatarLabel: 'Profile Avatar (Optional)',
        avatarOptions: {
          'coral-glow': 'Coral',
          'lavender-mist': 'Lavender',
          'sage-calm': 'Sage',
          'warm-amber': 'Amber',
          'photo-a': 'Portrait A',
          'photo-b': 'Portrait B',
        },
        languageLabel: 'Preferred Language',
      },
      step2: {
        title: 'Connect with Your Partner',
        subtitle:
          'Create an invitation code, enter a partner code, or continue and invite your partner later.',
        optionCreate: 'Create Code',
        optionJoin: 'Enter Code',
        optionLater: 'Invite Later',
        createDesc:
          'Share this local prototype invitation code with your partner, or tap below to simulate partner pairing on this device.',
        inviteCodeLabel: 'Local Invitation Code',
        copyCode: 'Copy Code',
        copiedCode: 'Copied',
        partnerJoinedButton: 'Simulate Partner Joined',
        partnerJoinedConfirmed: 'Partner Paired (Local Prototype Simulation)',
        joinDesc:
          'Enter a 4-digit partner code (e.g. DC-4829) to simulate local pairing on this device.',
        joinCodeLabel: 'Partner Invitation Code',
        joinCodePlaceholder: 'Enter DC-4829',
        verifyCodeButton: 'Pair',
        invalidCodeError: 'Please enter a valid invitation code (format DC-XXXX, e.g. DC-4829).',
        pairingSuccessBanner: 'Paired locally (prototype simulation) with code {code}.',
        laterTitle: 'Continue without pairing right now',
        laterDesc:
          'You can start building your Day 1 personal baseline immediately and invite your partner anytime from Profile.',
        laterConfirmedBanner: 'Partner pairing set to "Invite Later". You can connect anytime in Profile.',
        pairingRequiredError:
          'Please simulate pairing, enter a partner code, or choose "Invite Later" to continue.',
        localSimulationNote:
          'Local prototype simulation only — does not sync with a real remote partner across devices.',
      },
      step3: {
        title: 'Your Data, Your Choice.',
        subtitle: 'Choose which personal summaries you are comfortable sharing with your partner.',
        offByDefaultNote:
          'All sharing switches start OFF. Enable only what you explicitly want to share.',
        privacyFootnote: 'You can change these permissions at any time.',
        cycleFutureBadge: 'Optional future feature · Disabled in prototype',
      },
      step4: {
        title: 'How do you like to be cared for?',
        subtitle:
          'Select preferences that help guide thoughtful care ideas. You may skip this step.',
        preferredCareTitle: 'Preferred care',
        avoidTitle: 'Things to avoid',
        communicationTitle: 'Communication style',
        preferredCareOptions: {
          warm_drinks: 'Warm drinks',
          gentle_messages: 'Gentle messages',
          quiet_time: 'Quiet time',
          light_meals: 'Light meals',
          relaxing_walks: 'Relaxing walks',
          small_surprises: 'Small surprises',
        },
        avoidOptions: {
          crowded_places: 'Crowded places',
          surprise_visits: 'Surprise visits',
          frequent_messages: 'Frequent messages',
          last_minute_plans: 'Last-minute plans',
        },
        communicationOptions: {
          gentle_supportive: 'Gentle and supportive',
          short_direct: 'Short and direct',
          playful_cheerful: 'Playful and cheerful',
        },
      },
      step5: {
        title: 'Start Your Energy Baseline',
        subtitle:
          'Your personal baseline begins today. DualCharge will learn from the daily information you choose to share.',
        startBaselineTitle: 'Day 1 · Clean Personal Baseline',
        startBaselineBody:
          'You start with zero pre-filled records. Each daily check-in builds your own baseline toward your first 7-day preliminary insight.',
        day1Badge: 'Starts on Day 1',
        zeroHistoryBadge: '0 historical records',
        firstInsightBadge: 'First insight after 7 recorded days',
        futureIntegrationsNote:
          'Optional Apple Health / Health Connect integrations are reserved for a future release.',
        noHealthClaimNote:
          'No wearable data or demo sample records are imported into your personal account.',
        completeBaselineCta: 'Start Building My Energy Baseline',
      },
    },
    normalMode: {
      greetingTemplate: 'Good morning, {name}',
      partnerDisplayName: 'Partner',
      personalRoleLabel: 'Day {day} · Personal Account',
      dayBadgeTemplate: 'Day {day}',
      baselineBuildingBadge: 'Baseline Building',
      earlyBaselineBadge: 'Early Insight Available',
      baselineStartingTitle: 'Your Energy Baseline Is Starting',
      baselineStartingBody:
        'DualCharge is beginning to learn your daily energy patterns. Complete your daily check-ins to build your personal baseline.',
      firstInsightTimingNote:
        'Your first preliminary insight will be available after 7 days of recorded check-ins.',
      recordedDaysProgress: '{count} of {target} recorded days',
      checkInSavesBaselineNote:
        'Saved to your personal history ({count} of 7 recorded days toward early insight).',
      noEnergyIndexYet: 'Building baseline',
      avgSelfReportedLabel: 'Avg self-reported ({score} / 5)',
      notEnteredYet: 'Not recorded',
      invitePartnerTitle: 'Invite your partner',
      invitePartnerBody:
        'Waiting for your partner to connect. Pair anytime in Profile to share summaries.',
      invitePartnerCta: 'Invite Partner',
      waitingForPartnerTitle: 'Connected (Local)',
      waitingForPartnerCheckInBody: "Waiting for your partner's first check-in.",
      pairedStatusValue: 'Paired (Local Simulation · {code})',
      unpairedStatusValue: 'Waiting for your partner',
      pairLaterActionHint:
        'Pair with a local simulation code in Profile or invite your partner when ready.',
      simulatePartnerJoinNow: 'Simulate Partner Pairing ({code})',
      noCareActivityYet: 'No personal care activity recorded yet.',
      insightPreviewBuilding:
        'Your personal energy baseline is being built. Complete 7 days of daily check-ins to receive your first preliminary insight.',
      insightPreviewEarly:
        'Early Insight — Based on {count} recorded days, your average self-reported energy is {avg} / 5.',
      insightsBuildingTitle: 'Your personal energy baseline is being built.',
      insightsBuildingBody:
        'Complete 7 days of daily check-ins to receive your first preliminary insight.',
      observedSoFarTitle: 'Observed So Far ({count} / 7 days)',
      observedSoFarEmpty:
        'No daily check-ins recorded yet. Complete your first check-in on Home to record Day 1.',
      selfReportedScaleNote: 'Self-reported check-in scale (1–5)',
      earlyInsightBadge: 'Early Insight',
      earlyInsightTitle: 'Early Insight — Based on Your First 7 Days',
      earlyInsightSubtitle:
        'Computed exclusively from your {count} recorded personal check-in days.',
      avgScoreLabel: 'Average self-reported',
      scoreRangeLabel: 'Recorded range',
      dayTransitionsLabel: 'Day-to-day shifts',
      mostCommonFeelingLabel: 'Most frequent check-in',
      variationNotes: {
        steady: 'Your recorded check-ins stayed fairly steady across your recorded days.',
        fluctuating: 'Your energy showed noticeable day-to-day shifts across your recorded days.',
        low_reserve: 'Several recorded days leaned toward lower reserve or needing extra rest.',
      },
      weeklyPatternTitle: 'Weekday Pattern Analysis',
      notEnoughWeekdayRepeats:
        'Not enough repeated observations to identify a weekly pattern yet.',
      weeklyPatternRequirementNote:
        'Requires at least 4 valid observations of the same weekday across 4 distinct weeks (currently max {weeks} week(s) observed for any weekday).',
      preliminaryWeeklyPatternBadge: 'Preliminary Weekly Pattern',
      preliminaryWeeklyPatternBody:
        'Preliminary observation across {weeks} distinct weeks: {weekday} averaged {mean} / 5.',
      futureEstimatesInactiveTitle: 'Future Estimates Not Yet Available',
      futureEstimatesInactiveBody:
        'History-based future estimates stay disabled until sufficient multi-week personal records are collected.',
      careColdStartTitle: 'Your personalized care insights are just getting started.',
      careColdStartBody:
        'Once we learn more about your daily patterns, we can offer more tailored suggestions.',
      careSourcePreferenceBadge: 'Based on selected preferences',
      careSourceEarlyBaselineBadge: 'Based on preferences & early check-ins',
      carePartnerNotPairedNote:
        'Partner not paired yet — you can save suggestions now, or connect in Profile to log outgoing care notes.',
      careLocalSentNote: 'Logged locally in your Personal Notifications (prototype simulation).',
      careSuggestions: {
        'norm-care-warm-drinks': {
          title: 'Prepare a Warm Drink',
          description: 'Offer a comforting cup of warm tea, cocoa, or hot water.',
          reason: 'Suggested from your selected preference for warm drinks.',
          timing: 'Whenever convenient today',
          defaultMessage: 'Thinking of you today — would a warm drink help you unwind later?',
        },
        'norm-care-gentle-messages': {
          title: 'Send a Gentle Check-in',
          description: 'Share a brief, no-pressure note letting your partner know you are thinking of them.',
          reason: 'Matches your preference for gentle messages without pressure.',
          timing: 'Midday or evening',
          defaultMessage: 'No rush to reply — just sending a gentle hello and hoping your day feels calm.',
        },
        'norm-care-quiet-time': {
          title: 'Protect Quiet Time Together',
          description: 'Set aside 30 unhurried, low-stimulus minutes at home without extra errands.',
          reason: 'Suggested from your selected preference for quiet time.',
          timing: 'This evening',
          defaultMessage: 'How about keeping tonight extra quiet and relaxed with zero extra plans?',
        },
        'norm-care-light-meals': {
          title: 'Plan an Easy, Light Meal',
          description: 'Keep dinner simple so neither partner feels stretched at the end of the day.',
          reason: 'Suggested from your selected preference for light meals.',
          timing: 'Dinner time',
          defaultMessage: 'Let us keep dinner light and effortless tonight so we can both rest well.',
        },
        'norm-care-relaxing-walks': {
          title: 'Invite for a Relaxing Walk',
          description: 'Take a slow, unhurried walk around a quiet neighborhood block.',
          reason: 'Matches your preference for relaxing walks.',
          timing: 'Late afternoon or evening',
          defaultMessage: 'Want to take a slow, easy walk together later to stretch and breathe?',
        },
        'norm-care-small-surprises': {
          title: 'Leave a Small Thoughtful Note',
          description: 'Write a short encouraging sticky note or small everyday gesture.',
          reason: 'Matches your preference for thoughtful small surprises.',
          timing: 'Anytime today',
          defaultMessage: 'Left a tiny reminder that I appreciate you — hope today treats you gently!',
        },
      },
      careContextWindowBuilding: 'Day 1+ · Preference-guided suggestions only',
      careContextWindowEarly: 'Early baseline · Not a predictive forecast',
      notificationsOutgoingOnlyNote:
        'Outgoing care notes created in Personal Mode are stored locally on this device.',
      modeAndDemoTitle: 'Presentation & Setup',
      modeAndDemoDesc:
        'Explore the separate 60-day Alex & Jamie classroom demo without affecting your personal Day 1+ records.',
      enterPresentationDemo: 'Enter Presentation Demo Mode',
      returnToWelcomeBtn: 'Return to Welcome',
      resetOnboardingBtn: 'Reset Personal Data',
      resetOnboardingTitle: 'Reset Personal Account & Onboarding?',
      resetOnboardingBody:
        'This will permanently clear your personal profile, daily check-in records, local pairing, sharing consent, and preferences, then return to Welcome. Presentation Demo Mode will not be affected.',
      confirmResetOnboarding: 'Reset Personal Data',
    },
  },

  'zh-CN': {
    meta: {
      presentationSubtitle: 'AI 伴侣关怀助手 · 双手机交互演示原型',
      partnerALabel: '伴侣 A',
      partnerBLabel: '伴侣 B',
      activePhone: '当前手机',
      resetDemo: '重置演示',
      resetConfirmTitle: '确认重置演示状态？',
      resetConfirmBody:
        '此操作将清空新发送的关怀消息、重置通知状态、清空已收藏建议，并恢复默认的每日签到与隐私共享设置。',
      resetConfirmNote: '您当前选择的语言偏好将会保留。',
      cancel: '取消',
      confirmReset: '确认重置',
      simulatedDemoData: '模拟演示数据',
      todayDateLabel: '2026年11月13日 周五',
    },
    nav: {
      home: '首页',
      insights: '洞察',
      care: '关怀',
      profile: '我的',
      notificationsAria: '通知中心',
    },
    greetings: {
      alex: '早上好，Alex',
      jamie: '早上好，Jamie',
    },
    energyStates: {
      steady: '平稳充沛',
      moderate: '中等平稳',
      low: '偏低需休息',
    },
    home: {
      connectedWith: '已与 {partner} 温柔连接',
      myEnergy: '我的精力',
      partnerSharedEnergy: '{partner} 的共享精力',
      estimatedEnergyIndex: '预估精力指数',
      personalSpaceTag: '个人私密',
      sharedSpaceTag: '伴侣共享',
      sharingPaused: '已暂停共享',
      sharingPausedNote: '{partner} 已在个人设置中关闭精力摘要共享。',
      todaysSummary: '今日摘要',
      personalView: '个人视图',
      sleepDuration: '睡眠时长',
      sleepQuality: '睡眠质量',
      activity: '活动时长',
      selfReported: '主观状态',
      pendingCheckIn: '待签到',
      hoursUnit: '小时',
      minutesUnit: '分钟',
      partnerSharedContext: '{partner} 的共享信息',
      privacyControlled: '隐私受控',
      partnerEnergyHiddenNotice:
        '{partner} 已暂停共享精力摘要。仅展示对方明确授权的摘要信息。',
      partnerDefaultPrivacyNotice:
        '默认仅展示共享精力摘要。睡眠与活动等详细数据仅保存在 {partner} 的手机上，除非对方主动开启共享。',
      sleepLabel: '睡眠',
      activityLabel: '活动',
      dailyCheckIn: '每日状态签到',
      howAreYouFeeling: '今天感觉如何？',
      checkInOptions: {
        good: { label: '状态不错', hint: '精力平稳' },
        tired: { label: '有点疲惫', hint: '放慢节奏' },
        rest: { label: '需要休息', hint: '今日偏低' },
      },
      checkInConfirmed: '今日主观状态已更新为「{status}」（{time}）。',
      checkInPreservedNote: '已保留 {count} 条历史记录（手动签到，非穿戴设备数据）。',
      aiInsightPreview: 'AI 洞察预览',
      insightPreviewAlex: 'Jamie 在周四呈现出重复性的精力偏低规律。',
      insightPreviewJamie: '您在周四呈现出重复性的精力偏低规律。',
      viewInsights: '查看洞察',
      recentCareActivity: '近期关怀动态',
      openCare: '前往关怀',
    },
    insights: {
      title: 'AI 洞察',
      subtitle: '读懂日常规律，提前温柔关照。',
      myPatternTab: '我的规律 ({name})',
      partnerSharedTab: '{name} (已共享)',
      sharedInsightsPausedTitle: '共享洞察已暂停',
      sharedInsightsPausedBody: '{name} 已在个人隐私设置中暂停共享精力摘要。',
      historicalTrendTitle: '历史精力趋势',
      last60Days: '近 60 天',
      dateRangeTapHint: '2026年9月15日 – 11月13日 · 点击任意日期查看详情',
      thursdayDipTag: '周四低谷',
      restReminderAnnotation: '周四可以多一点休息',
      historicalBadge: '已记录',
      forecastBadge: '预估',
      indexLabel: '指数',
      sleepShortLabel: '睡眠',
      sleepPrivateLabel: '未共享',
      legendDailyEnergy: '每日精力指数',
      legendObservedThursdays: '观察到的周四 (9次)',
      patternDetectionPrefix: '规律识别 · {name}',
      alexNoPatternTitle: '未检测到显著的周中重复性精力偏低规律。',
      alexNoPatternNote: '根据模拟历史记录，您在工作日内的精力水平保持平稳。',
      alexOverallAvgLabel: '60 天整体平均精力',
      jamiePatternTitle: '检测到周四重复性精力下降规律',
      jamiePatternNote: '以上数据基于 60 天模拟历史记录计算得出。',
      overallAvgEnergy: '整体平均精力',
      thursdayAvgEnergy: '周四平均精力',
      thursdayObservations: '周四观察次数',
      prevDayAvgSleep: '前一日平均睡眠',
      future7DayTitle: '未来 7 天趋势预估',
      forecastRange: '11月14日 – 11月20日',
      estimatedIndexColon: '预估精力指数：',
      confidenceColon: '置信度：',
      confidenceLevels: {
        High: '高',
        Moderate: '中等',
        Low: '较低',
      },
      forecastFooterLabel: '基于规律的预估 — 演示数据',
      whyIdentifiedTitle: '系统为何识别出这一规律？',
      observedHistoricalTitle: '已观察到的历史数据',
      estimatedFutureTitle: '未来预估参考值',
      alexEvidenceObserved: [
        '60 天模拟精力记录显示您的指数稳定在 78 至 100 之间（均值 87.3）。',
        '所有工作日记录的前一晚平均睡眠时长为 7.1 小时。',
      ],
      alexEvidenceEstimated: [
        '基于近期稳定的作息节奏，未来 7 天预计维持在 76–83 的平稳区间。',
        '预估仅反映近期规律稳定性，并非绝对确定的结果。',
      ],
      jamieEvidenceObserved: [
        '在连续 9 个周四的记录中，精力平均值为 40.3，明显低于 60 天整体均值 67.6。',
        '这些周四对应的周三夜晚平均睡眠为 5.7 小时，比其他工作日夜晚少约 0.9 小时。',
      ],
      jamieEvidenceEstimated: [
        '结合周中恢复规律，预计 2026年11月19日（周四）精力指数为 47 / 100（中等置信度）。',
        '此预估仅作为合理安排轻松日程的参考，并非确定结果或医疗判断。',
      ],
      viewCareSuggestions: '查看关怀建议',
    },
    care: {
      title: 'AI 关怀',
      subtitle: '微小行动，暖心时刻。',
      defaultRecipient: '默认关怀对象',
      predictedWindowLabel: '预计需要关怀时段：',
      reasonLabel: '推荐依据：',
      jamieWindow: '2026年11月19日 周四 · 下午至晚间',
      jamieReason:
        '检测到周四重复性精力偏低规律（预估 47 / 100），通常出现在周中睡眠偏少之后。',
      alexWindow: '今晚 · 18:30 – 21:00',
      alexReason: '本周精力状态平稳，轻松的晚间互动有助于共同放松与情感联结。',
      personalizedSuggestionsTitle: '个性化关怀建议',
      forRecipient: '为 {name} 准备',
      whyThisFits: '契合原因：',
      suggestedTiming: '建议时间：',
      nonPurchaseTag: '无需消费关怀',
      homeGestureTag: '日常暖心举动',
      editMessage: '编辑留言',
      hideMessageEditor: '收起编辑',
      customMessageLabel: '发送给 {name} 的关怀留言',
      sendCare: '发送关怀',
      saveSuggestion: '收藏建议',
      saved: '已收藏',
      viewNotifications: '查看已发送',
      sentToastTitle: '已向 {name} 发送关怀',
      savedToastText: '已将「{title}」加入收藏列表。',
      alreadySavedText: '「{title}」已在您的收藏列表中。',
      suggestions: {
        'care-jamie-warm-drink': {
          title: '准备一杯热饮',
          description: '为 Jamie 准备一杯热奶茶。',
          reason: '符合 Jamie 明确记录的偏好：喜欢热奶茶。',
          timing: '11月19日 周四 · 16:00',
          defaultMessage: '想到你周四会比较忙碌，忙完后想喝杯热奶茶放松一下吗？',
        },
        'care-jamie-quiet-evening': {
          title: '安排安静的夜晚',
          description: '提议在家享用清淡晚餐或安静共度晚间时光。',
          reason: '符合 Jamie 偏好安静活动和忙碌后清淡晚餐的习惯。',
          timing: '11月19日 周四 · 19:00',
          defaultMessage: '周四晚上我们轻松一点吧，在家吃顿清淡晚餐，不安排任何奔波。',
        },
        'care-jamie-gentle-checkin': {
          title: '发送轻柔问候',
          description: '发一句简短温暖的关心，不给对方立即回复的压力。',
          reason: '无需消费的贴心关怀，契合 Jamie 喜欢轻柔问候的偏好。',
          timing: '11月19日 周四 · 午间',
          defaultMessage: '希望你今天过得轻松自在。不用急着回复，只是想给你加加油！',
        },
        'care-alex-evening-walk': {
          title: '约一场晚间散步',
          description: '邀请 Alex 晚饭后在附近慢走 20 分钟。',
          reason: '符合 Alex 喜欢轻松晚间散步的偏好。',
          timing: '今晚 · 18:30',
          defaultMessage: '晚饭后要不要一起出去慢走 20 分钟，吹吹晚风放松一下？',
        },
        'care-alex-fruit-tea': {
          title: '泡一壶温热果茶',
          description: '泡一壶温暖的水果茶，一起舒缓身心。',
          reason: '符合 Alex 明确记录的偏好：喜欢水果茶。',
          timing: '今晚 · 20:30',
          defaultMessage: '晚上准备泡一壶温热果茶，给你留了一杯哦。',
        },
        'care-alex-supportive-note': {
          title: '发一句暖心鼓励',
          description: '发一条简短的感谢与支持消息。',
          reason: '无需消费的轻量关怀，符合 Alex 喜欢简短鼓励信息的偏好。',
          timing: '今日任意时间',
          defaultMessage: '这周看你一直很稳健也很贴心，有你在真好！',
        },
      },
    },
    notifications: {
      title: '通知中心',
      subtitle: '伴侣之间互相发送与接收的关怀消息。',
      receivedTab: '已收到',
      sentTab: '已发送',
      newCountSuffix: '条新消息',
      emptyReceivedTitle: '暂未收到关怀消息',
      emptyReceivedBody: '当您的伴侣在另一部手机发送关怀建议时，消息会立即显示在这里。',
      emptySentTitle: '暂未发送关怀消息',
      emptySentBody: '前往 AI 关怀页面，为伴侣送上一份贴心的提醒或问候。',
      exploreAiCare: '前往 AI 关怀',
      relatedSuggestion: '关联建议：',
      markAsReceived: '标记为已收到',
      markAsCompleted: '标记为已完成',
      statuses: {
        Sent: '已发送',
        Received: '已收到',
        Completed: '已完成',
      },
      todayPrefix: '今天',
      yesterdayPrefix: '昨天',
    },
    profile: {
      roles: {
        alex: '伴侣 A · 演示账号',
        jamie: '伴侣 B · 演示账号',
      },
      simulatedDemoProfile: '模拟演示资料',
      languageSectionTitle: '语言设置',
      languageSectionDesc: '切换后两部手机将同步更新，并自动保存于本地。',
      languages: {
        en: 'English',
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
      },
      coupleSettingsTitle: '伴侣关系设置',
      partnerName: '伴侣姓名',
      demoPairingCode: '演示配对码',
      connectionStatus: '连接状态',
      connectedStatusValue: '已连接 · 共享演示伴侣',
      dataSharingTitle: '数据共享与隐私控制',
      dataSharingDesc: '您可以自主决定允许 {partner} 查看哪些健康摘要，更改会立即生效。',
      energySummaryTitle: '精力摘要',
      energySummaryDesc: '共享每日预估精力指数',
      sleepSummaryTitle: '睡眠摘要',
      sleepSummaryDesc: '共享睡眠时长与睡眠质量评分',
      activitySummaryTitle: '活动摘要',
      activitySummaryDesc: '共享每日活动分钟数',
      cycleTitle: '生理周期信息',
      cycleDesc: '可选功能 · 预留给未来版本（默认不启用）',
      sharingFeedbackOn: '已向 {partner} 开启「{label}」共享。',
      sharingFeedbackOff: '已向 {partner} 隐藏「{label}」。',
      carePreferencesTitle: '个人关怀偏好',
      carePreferencesDesc: '这些偏好标签将帮助 AI 关怀提供更贴合心意的建议。',
      newPreferencePlaceholder: '添加新的关怀偏好...',
      addButton: '添加',
      removeTagAria: '移除 {tag}',
      presetTags: {
        alex_short_messages: '简短鼓励消息',
        alex_evening_walks: '轻松晚间散步',
        alex_fruit_tea: '水果茶',
        alex_no_surprise_visits: '避免突然造访',
        jamie_quiet_time: '安静独处或陪伴时间',
        jamie_light_dinner: '清淡晚餐',
        jamie_warm_milk_tea: '热奶茶',
        jamie_gentle_checkins: '轻柔问候',
        jamie_no_crowds: '忙碌后避免拥挤活动',
      },
      membershipTitle: '会员方案',
      demoPricingProposal: '演示定价方案',
      freePlanTitle: '免费版',
      freePrice: 'HK$0',
      perMonth: '/ 月',
      freeBenefits: ['基础精力摘要', '基础规律洞察', '有限的关怀建议'],
      premiumPlanTitle: '伴侣尊享版',
      premiumPrice: 'HK$28–38',
      perCoupleMonth: '/ 对 / 月',
      premiumBenefits: [
        '更深入的历史规律分析',
        '更详细的未来趋势预估',
        '高度个性化的关怀建议',
        '历史关怀偏好洞察记录',
      ],
      pricingProposalNote: '港币参考定价 — 仅作产品演示方案展示',
      explorePremium: '了解尊享会员',
      premiumModalTitle: '伴侣尊享版说明',
      premiumModalBody:
        '伴侣共享同一份订阅方案，建议定价为每对伴侣每月 HK$28–38。Alex 与 Jamie 双方均可解锁 60 天深度规律分析、7 天趋势预估与偏好驱动的专属关怀建议。',
      premiumModalDisclaimer: '此为会员信息模拟弹窗 — 本原型不会发起任何真实支付或扣费。',
      premiumConfirmButton: '确认体验演示方案',
      premiumConfirmedBanner: '已记录演示体验意向！正式版本中伴侣双方仅需一份共同订阅。',
      closePreview: '关闭',
    },
    activityTemplates: {
      sentCare: '{actor} 向 {target} 发送了「{suggestion}」。',
      savedCare: '{actor} 收藏了「{suggestion}」。',
      completedCare: '{actor} 将「{suggestion}」标记为已完成。',
      seedSupportive: 'Alex 向 Jamie 发送了一条暖心问候。',
      seedSavedEvening: 'Jamie 收藏了一条轻松晚间建议。',
    },
    calendar: {
      weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      weekdaysFull: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      monthsFull: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
    welcome: {
      headline: '关怀，从读懂彼此开始。',
      subtitle: '了解伴侣的精力波动规律，发现更贴心、更有分寸的关怀方式。',
      startJourney: '开启 DualCharge 之旅',
      exploreDemo: '体验伴侣双机演示',
      demoFootnote: '全新 Day 1 个人冷启动 · 与 60 天 Alex & Jamie 双机演示严格隔离',
      returnToWelcome: '欢迎页',
      enterDemoMode: '双机演示',
      exitDemoMode: '退出演示',
      personalModeBadge: '个人视图',
      resumePersonalApp: '以 {name} 的身份继续',
      loadingPresentationDemo: '正在加载 60 天伴侣双机演示数据...',
    },
    onboarding: {
      stepCounter: '第 {current} / {total} 步',
      back: '上一步',
      continue: '继续',
      skipForNow: '暂不设置，跳过',
      completeSetup: '开始建立我的精力基线',
      localSetupTag: 'Day 1 个人初始设置',
      step1: {
        title: '先认识一下你吧。',
        subtitle: '创建本地个人档案。本原型不收集手机号、密码或真实医疗健康记录。',
        nicknameLabel: '你的称呼 / 昵称',
        nicknamePlaceholder: '请输入你的称呼或昵称',
        nicknameRequiredError: '请输入称呼或昵称后再继续。',
        avatarLabel: '个人头像（可选）',
        avatarOptions: {
          'coral-glow': '暖珊瑚',
          'lavender-mist': '柔薰衣草',
          'sage-calm': '鼠尾草',
          'warm-amber': '暖琥珀',
          'photo-a': '肖像 A',
          'photo-b': '肖像 B',
        },
        languageLabel: '界面语言偏好',
      },
      step2: {
        title: '与伴侣建立连接',
        subtitle: '生成邀请码、输入伴侣邀请码，或稍后再邀请伴侣。',
        optionCreate: '生成邀请码',
        optionJoin: '输入邀请码',
        optionLater: '稍后邀请',
        createDesc: '将下方本地模拟邀请码分享给伴侣，或点击按钮在本机模拟配对完成。',
        inviteCodeLabel: '本地邀请码',
        copyCode: '复制邀请码',
        copiedCode: '已复制',
        partnerJoinedButton: '模拟伴侣已加入',
        partnerJoinedConfirmed: '已完成本地配对（原型模拟）',
        joinDesc: '输入 4 位数字邀请码（如 DC-4829）以在本机模拟与伴侣配对。',
        joinCodeLabel: '伴侣邀请码',
        joinCodePlaceholder: '请输入 DC-4829',
        verifyCodeButton: '确认配对',
        invalidCodeError: '请输入有效的邀请码（格式 DC-XXXX，例如 DC-4829）。',
        pairingSuccessBanner: '已通过邀请码 {code} 完成本地原型配对。',
        laterTitle: '暂不配对，先开启个人体验',
        laterDesc: '你可以先从 Day 1 开始建立自己的精力基线，随时前往「我的」页面邀请伴侣。',
        laterConfirmedBanner: '已选择「稍后邀请伴侣」，之后可随时在「我的」中连接。',
        pairingRequiredError: '请完成模拟配对、输入伴侣邀请码，或选择「稍后邀请」后再继续。',
        localSimulationNote: '仅限本机原型模拟，未连接真实远程跨设备伴侣同步。',
      },
      step3: {
        title: '你的数据，由你做主。',
        subtitle: '选择你愿意向伴侣分享的个人状态摘要。',
        offByDefaultNote: '所有分享开关默认处于关闭状态，仅在你主动开启后才会共享。',
        privacyFootnote: '你可以随时在「我的」页面调整这些权限。',
        cycleFutureBadge: '可选未来功能 · 本原型暂未启用',
      },
      step4: {
        title: '你喜欢被怎样温柔对待？',
        subtitle: '选择最让你感到舒适的关怀方式，也可直接跳过此步。',
        preferredCareTitle: '喜欢的关怀方式',
        avoidTitle: '希望避免的安排',
        communicationTitle: '偏好的沟通语气',
        preferredCareOptions: {
          warm_drinks: '热饮',
          gentle_messages: '轻柔问候',
          quiet_time: '安静陪伴/独处',
          light_meals: '清淡餐食',
          relaxing_walks: '轻松散步',
          small_surprises: '小惊喜',
        },
        avoidOptions: {
          crowded_places: '拥挤场所',
          surprise_visits: '突然造访',
          frequent_messages: '频繁发消息',
          last_minute_plans: '临时变动计划',
        },
        communicationOptions: {
          gentle_supportive: '温柔且体贴支持',
          short_direct: '简短而直接',
          playful_cheerful: '轻松俏皮愉快',
        },
      },
      step5: {
        title: '开始建立你的精力基线',
        subtitle: '你的个人基线从今天正式开始。DualCharge 将根据你主动分享的日常信息逐步学习。',
        startBaselineTitle: 'Day 1 · 全新个人基线',
        startBaselineBody: '你的历史记录将从 0 开始，每次每日签到都会累积为你的专属基线与第 7 天初步洞察。',
        day1Badge: '从第 1 天开始',
        zeroHistoryBadge: '0 条历史记录',
        firstInsightBadge: '记录满 7 天后解锁首次初步洞察',
        futureIntegrationsNote: '未来版本将可选支持 Apple Health / Health Connect 等平台接入。',
        noHealthClaimNote: '不会向你的个人账号导入任何穿戴设备数据或演示样本记录。',
        completeBaselineCta: '开始建立我的精力基线',
      },
    },
    normalMode: {
      greetingTemplate: '早安，{name}',
      partnerDisplayName: '伴侣',
      personalRoleLabel: '第 {day} 天 · 个人账号',
      dayBadgeTemplate: '第 {day} 天',
      baselineBuildingBadge: '基线建立中',
      earlyBaselineBadge: '已生成初步洞察',
      baselineStartingTitle: '你的精力基线正在起步',
      baselineStartingBody:
        'DualCharge 正在开始学习你的日常精力节奏。坚持完成每日状态签到，即可逐步建立你的个人基线。',
      firstInsightTimingNote: '累计完成 7 天每日签到后，将为你生成首次初步洞察。',
      recordedDaysProgress: '已记录 {count} / {target} 天',
      checkInSavesBaselineNote: '已保存至个人记录（已记录 {count} / 7 天，满 7 天解锁初步洞察）。',
      noEnergyIndexYet: '基线建立中',
      avgSelfReportedLabel: '平均主观精力 ({score} / 5)',
      notEnteredYet: '暂未记录',
      invitePartnerTitle: '邀请你的伴侣',
      invitePartnerBody: '正在等待伴侣连接。你可随时在「我的」页面完成本地配对并开启共享。',
      invitePartnerCta: '邀请伴侣',
      waitingForPartnerTitle: '已连接（本地模拟）',
      waitingForPartnerCheckInBody: '正在等待伴侣完成首次每日签到。',
      pairedStatusValue: '已配对（本地模拟 · {code}）',
      unpairedStatusValue: '等待伴侣连接',
      pairLaterActionHint: '可随时在「我的」中使用模拟邀请码完成配对。',
      simulatePartnerJoinNow: '模拟伴侣完成配对 ({code})',
      noCareActivityYet: '暂未产生个人关怀记录。',
      insightPreviewBuilding: '你的个人精力基线正在建立中。完成 7 天每日签到即可解锁首次初步洞察。',
      insightPreviewEarly: '初步洞察 — 基于你真实记录的 {count} 天，平均主观精力评分为 {avg} / 5。',
      insightsBuildingTitle: '你的个人精力基线正在建立中。',
      insightsBuildingBody: '完成 7 天每日签到，即可获得基于你自身数据的首次初步洞察。',
      observedSoFarTitle: '目前已记录数据 ({count} / 7 天)',
      observedSoFarEmpty: '暂无每日签到记录。前往首页完成今日首次签到，即可开启第 1 天记录。',
      selfReportedScaleNote: '个人主观精力评分（1–5 分制）',
      earlyInsightBadge: '初步洞察',
      earlyInsightTitle: '初步洞察 — 基于你的前 7 天记录',
      earlyInsightSubtitle: '完全基于你亲手记录的 {count} 天个人签到数据生成。',
      avgScoreLabel: '平均主观精力',
      scoreRangeLabel: '记录区间',
      dayTransitionsLabel: '相邻日波动次数',
      mostCommonFeelingLabel: '最常见状态',
      variationNotes: {
        steady: '在你记录的这几天中，整体精力状态保持相对平稳。',
        fluctuating: '在你记录的这几天中，日间精力呈现出一定的起伏变化。',
        low_reserve: '在已记录的日期中，有较多天倾向于精力偏低或需要多休息。',
      },
      weeklyPatternTitle: '周内规律识别',
      notEnoughWeekdayRepeats: '目前重复观察次数不足，尚无法识别稳定的每周规律。',
      weeklyPatternRequirementNote:
        '至少需要在 4 个不同自然周中观察到同一星期几的有效记录（当前单一星期几最多仅观察到 {weeks} 周）。',
      preliminaryWeeklyPatternBadge: '初步周规律提示',
      preliminaryWeeklyPatternBody:
        '基于跨 {weeks} 周的真实记录初步观察：{weekday} 平均主观精力的均值为 {mean} / 5。',
      futureEstimatesInactiveTitle: '未来趋势预估暂未开启',
      futureEstimatesInactiveBody: '需积累足够多周的真实个人历史数据后，系统才会提供基于历史规律的未来参考预估。',
      careColdStartTitle: '你的个性化关怀洞察才刚刚起步。',
      careColdStartBody: '随着我们逐步了解你的日常作息与精力节奏，将能够提供更贴合的关怀建议。',
      careSourcePreferenceBadge: '基于你主动选择的偏好',
      careSourceEarlyBaselineBadge: '结合偏好与初期签到记录',
      carePartnerNotPairedNote: '暂未配对伴侣 — 你仍可收藏喜欢的建议，或先在「我的」中配对后再记录发送关怀。',
      careLocalSentNote: '已记录在你的本地「通知中心」中（本机原型模拟）。',
      careSuggestions: {
        'norm-care-warm-drinks': {
          title: '准备一杯热饮',
          description: '递上一杯温和的热茶、热可可或温开水。',
          reason: '根据你在引导中主动选择的「热饮」偏好推荐。',
          timing: '今日方便时随时',
          defaultMessage: '今天辛苦啦，待会儿想喝杯热饮慢慢放松一下吗？',
        },
        'norm-care-gentle-messages': {
          title: '发送轻柔问候',
          description: '发一句简短温暖、没有回复压力的关心。',
          reason: '符合你选择的「轻柔问候」偏好。',
          timing: '午间或傍晚',
          defaultMessage: '不用急着回复，只是想跟你说声今天也要照顾好自己，愿你一切顺心。',
        },
        'norm-care-quiet-time': {
          title: '留出安静相处时间',
          description: '在家预留 30 分钟不被打扰、轻松安静的休息时光。',
          reason: '根据你选择的「安静陪伴/独处」偏好推荐。',
          timing: '今晚休息时段',
          defaultMessage: '今晚我们不安排额外琐事，一起安安静静放松休息吧。',
        },
        'norm-care-light-meals': {
          title: '安排一顿清淡简餐',
          description: '准备一顿轻松易消化的晚餐，减轻晚间身心负担。',
          reason: '根据你选择的「清淡餐食」偏好推荐。',
          timing: '晚餐时段',
          defaultMessage: '今晚我们吃顿清淡省心的晚餐吧，让身体也好好歇一歇。',
        },
        'norm-care-relaxing-walks': {
          title: '约一场轻松散步',
          description: '在安静的街区一起慢走 15–20 分钟，呼吸新鲜空气。',
          reason: '符合你选择的「轻松散步」偏好。',
          timing: '傍晚或晚饭后',
          defaultMessage: '晚饭后要不要一起出去慢慢散步二十分钟，吹吹风放松一下？',
        },
        'norm-care-small-surprises': {
          title: '留一张暖心小纸条',
          description: '准备一句简短的感谢留言或一个日常小惊喜。',
          reason: '符合你选择的「小惊喜」偏好。',
          timing: '今日任意时刻',
          defaultMessage: '给你留了一个小小鼓励，谢谢你一直以来的温柔陪伴！',
        },
      },
      careContextWindowBuilding: 'Day 1+ · 仅提供基于偏好的日常建议',
      careContextWindowEarly: '初期基线阶段 · 非未来趋势预测',
      notificationsOutgoingOnlyNote: '个人模式中发送的关怀留言仅保存在本机当前档案中。',
      modeAndDemoTitle: '演示模式与个人数据管理',
      modeAndDemoDesc: '可随时进入独立的 60 天 Alex & Jamie 双机演示，不会影响你的个人 Day 1+ 记录。',
      enterPresentationDemo: '进入双机演示模式',
      returnToWelcomeBtn: '返回欢迎页',
      resetOnboardingBtn: '重置个人数据',
      resetOnboardingTitle: '确认清除个人档案并重置引导？',
      resetOnboardingBody:
        '此操作将清除你的个人昵称、所有每日签到记录、本地配对、隐私设置与偏好，并返回欢迎页。双机演示模式数据不受影响。',
      confirmResetOnboarding: '确认重置',
    },
  },

  'zh-TW': {
    meta: {
      presentationSubtitle: 'AI 伴侶關懷夥伴 · 雙手機互動展示原型',
      partnerALabel: '伴侶 A',
      partnerBLabel: '伴侶 B',
      activePhone: '目前手機',
      resetDemo: '重設展示',
      resetConfirmTitle: '確認重設展示狀態？',
      resetConfirmBody:
        '此操作將清除新發送的關懷訊息、重設通知狀態、清空已收藏建議，並恢復預設的每日簽到與隱私分享設定。',
      resetConfirmNote: '您目前選擇的語言偏好將會保留。',
      cancel: '取消',
      confirmReset: '確認重設',
      simulatedDemoData: '模擬展示數據',
      todayDateLabel: '2026年11月13日 週五',
    },
    nav: {
      home: '首頁',
      insights: '洞察',
      care: '關懷',
      profile: '我的',
      notificationsAria: '通知中心',
    },
    greetings: {
      alex: '早安，Alex',
      jamie: '早安，Jamie',
    },
    energyStates: {
      steady: '平穩充沛',
      moderate: '中等平穩',
      low: '偏低需休息',
    },
    home: {
      connectedWith: '已與 {partner} 溫柔連結',
      myEnergy: '我的精力',
      partnerSharedEnergy: '{partner} 的分享精力',
      estimatedEnergyIndex: '預估精力指數',
      personalSpaceTag: '個人私密',
      sharedSpaceTag: '伴侶分享',
      sharingPaused: '已暫停分享',
      sharingPausedNote: '{partner} 已在個人設定中關閉精力摘要分享。',
      todaysSummary: '今日摘要',
      personalView: '個人檢視',
      sleepDuration: '睡眠時長',
      sleepQuality: '睡眠品質',
      activity: '活動時長',
      selfReported: '主觀狀態',
      pendingCheckIn: '待簽到',
      hoursUnit: '小時',
      minutesUnit: '分鐘',
      partnerSharedContext: '{partner} 的分享資訊',
      privacyControlled: '隱私受控',
      partnerEnergyHiddenNotice:
        '{partner} 已暫停分享精力摘要。僅顯示對方明確授權的摘要資訊。',
      partnerDefaultPrivacyNotice:
        '預設僅顯示分享精力摘要。睡眠與活動等詳細資料僅保留於 {partner} 的手機，除非對方主動開啟分享。',
      sleepLabel: '睡眠',
      activityLabel: '活動',
      dailyCheckIn: '每日狀態簽到',
      howAreYouFeeling: '今天感覺如何？',
      checkInOptions: {
        good: { label: '狀態不錯', hint: '精力平穩' },
        tired: { label: '有點疲憊', hint: '放慢步調' },
        rest: { label: '需要休息', hint: '今日偏低' },
      },
      checkInConfirmed: '今日主觀狀態已更新為「{status}」（{time}）。',
      checkInPreservedNote: '已保留 {count} 筆歷史紀錄（手動簽到，非穿戴裝置數據）。',
      aiInsightPreview: 'AI 洞察預覽',
      insightPreviewAlex: 'Jamie 在週四呈現出重複性的精力偏低規律。',
      insightPreviewJamie: '您在週四呈現出重複性的精力偏低規律。',
      viewInsights: '查看洞察',
      recentCareActivity: '近期關懷動態',
      openCare: '前往關懷',
    },
    insights: {
      title: 'AI 洞察',
      subtitle: '讀懂日常規律，提前溫柔關照。',
      myPatternTab: '我的規律 ({name})',
      partnerSharedTab: '{name} (已分享)',
      sharedInsightsPausedTitle: '分享洞察已暫停',
      sharedInsightsPausedBody: '{name} 已在個人隱私設定中暫停分享精力摘要。',
      historicalTrendTitle: '歷史精力趨勢',
      last60Days: '近 60 天',
      dateRangeTapHint: '2026年9月15日 – 11月13日 · 點擊任意日期查看詳情',
      thursdayDipTag: '週四低谷',
      restReminderAnnotation: '週四可以多一點休息',
      historicalBadge: '已紀錄',
      forecastBadge: '預估',
      indexLabel: '指數',
      sleepShortLabel: '睡眠',
      sleepPrivateLabel: '未分享',
      legendDailyEnergy: '每日精力指數',
      legendObservedThursdays: '觀察到的週四 (9次)',
      patternDetectionPrefix: '規律識別 · {name}',
      alexNoPatternTitle: '未偵測到顯著的週間重複性精力偏低規律。',
      alexNoPatternNote: '根據模擬歷史紀錄，您在工作日內的精力水平保持平穩。',
      alexOverallAvgLabel: '60 天整體平均精力',
      jamiePatternTitle: '偵測到週四重複性精力下降規律',
      jamiePatternNote: '以上數據依據 60 天模擬歷史紀錄計算得出。',
      overallAvgEnergy: '整體平均精力',
      thursdayAvgEnergy: '週四平均精力',
      thursdayObservations: '週四觀察次數',
      prevDayAvgSleep: '前一日平均睡眠',
      future7DayTitle: '未來 7 天趨勢預估',
      forecastRange: '11月14日 – 11月20日',
      estimatedIndexColon: '預估精力指數：',
      confidenceColon: '信心程度：',
      confidenceLevels: {
        High: '高',
        Moderate: '中等',
        Low: '較低',
      },
      forecastFooterLabel: '基於規律的預估 — 展示數據',
      whyIdentifiedTitle: '系統為何識別出這項規律？',
      observedHistoricalTitle: '已觀察到的歷史數據',
      estimatedFutureTitle: '未來預估參考值',
      alexEvidenceObserved: [
        '60 天模擬精力紀錄顯示您的指數穩定在 78 至 100 之間（均值 87.3）。',
        '所有工作日紀錄的前一晚平均睡眠時長為 7.1 小時。',
      ],
      alexEvidenceEstimated: [
        '依據近期穩定的作息節奏，未來 7 天預計維持在 76–83 的平穩區間。',
        '預估僅反映近期規律穩定性，並非絕對確定的結果。',
      ],
      jamieEvidenceObserved: [
        '在連續 9 個週四的紀錄中，精力平均值為 40.3，明顯低於 60 天整體均值 67.6。',
        '這些週四對應的週三夜晚平均睡眠為 5.7 小時，比其他工作日夜晚少約 0.9 小時。',
      ],
      jamieEvidenceEstimated: [
        '結合週間恢復規律，預計 2026年11月19日（週四）精力指數為 47 / 100（中等信心程度）。',
        '此預估僅作為合理安排輕鬆行程的參考，並非確定結果或醫療判斷。',
      ],
      viewCareSuggestions: '查看關懷建議',
    },
    care: {
      title: 'AI 關懷',
      subtitle: '微小行動，暖心時刻。',
      defaultRecipient: '預設關懷對象',
      predictedWindowLabel: '預計需要關懷時段：',
      reasonLabel: '推薦依據：',
      jamieWindow: '2026年11月19日 週四 · 下午至晚間',
      jamieReason:
        '偵測到週四重複性精力偏低規律（預估 47 / 100），通常出現在週間睡眠偏少之後。',
      alexWindow: '今晚 · 18:30 – 21:00',
      alexReason: '本週精力狀態平穩，輕鬆的晚間互動有助於共同放鬆與情感連結。',
      personalizedSuggestionsTitle: '個人化關懷建議',
      forRecipient: '為 {name} 準備',
      whyThisFits: '契合原因：',
      suggestedTiming: '建議時間：',
      nonPurchaseTag: '無需消費關懷',
      homeGestureTag: '日常暖心舉動',
      editMessage: '編輯留言',
      hideMessageEditor: '收起編輯',
      customMessageLabel: '傳送給 {name} 的關懷留言',
      sendCare: '發送關懷',
      saveSuggestion: '收藏建議',
      saved: '已收藏',
      viewNotifications: '查看已發送',
      sentToastTitle: '已向 {name} 發送關懷',
      savedToastText: '已將「{title}」加入收藏清單。',
      alreadySavedText: '「{title}」已在您的收藏清單中。',
      suggestions: {
        'care-jamie-warm-drink': {
          title: '準備一杯熱飲',
          description: '為 Jamie 準備一杯熱奶茶。',
          reason: '符合 Jamie 明確記錄的偏好：喜歡熱奶茶。',
          timing: '11月19日 週四 · 16:00',
          defaultMessage: '想到你週四會比較忙碌，忙完後想喝杯熱奶茶放鬆一下嗎？',
        },
        'care-jamie-quiet-evening': {
          title: '安排安靜的夜晚',
          description: '提議在家享用清淡晚餐或安靜共度晚間時光。',
          reason: '符合 Jamie 偏好安靜活動與忙碌後清淡晚餐的習慣。',
          timing: '11月19日 週四 · 19:00',
          defaultMessage: '週四晚上我們輕鬆一點吧，在家吃頓清淡晚餐，不安排任何奔波。',
        },
        'care-jamie-gentle-checkin': {
          title: '發送輕柔問候',
          description: '傳一句簡短溫暖的關心，不給對方立即回覆的壓力。',
          reason: '無需消費的貼心關懷，契合 Jamie 喜歡輕柔問候的偏好。',
          timing: '11月19日 週四 · 午間',
          defaultMessage: '希望你今天過得輕鬆自在。不用急著回覆，只是想給你加加油！',
        },
        'care-alex-evening-walk': {
          title: '約一場晚間散步',
          description: '邀請 Alex 晚飯後在附近慢走 20 分鐘。',
          reason: '符合 Alex 喜歡輕鬆晚間散步的偏好。',
          timing: '今晚 · 18:30',
          defaultMessage: '晚飯後要不要一起出去慢走 20 分鐘，吹吹晚風放鬆一下？',
        },
        'care-alex-fruit-tea': {
          title: '泡一壺溫熱果茶',
          description: '泡一壺溫暖的水果茶，一起舒緩身心。',
          reason: '符合 Alex 明確記錄的偏好：喜歡水果茶。',
          timing: '今晚 · 20:30',
          defaultMessage: '晚上準備泡一壺溫熱果茶，給你留了一杯喔。',
        },
        'care-alex-supportive-note': {
          title: '發一句暖心鼓勵',
          description: '傳一則簡短的感謝與支持訊息。',
          reason: '無需消費的輕量關懷，符合 Alex 喜歡簡短鼓勵訊息的偏好。',
          timing: '今日任意時間',
          defaultMessage: '這週看你一直很穩健也很貼心，有你在真好！',
        },
      },
    },
    notifications: {
      title: '通知中心',
      subtitle: '伴侶之間互相發送與接收的關懷訊息。',
      receivedTab: '已收到',
      sentTab: '已發送',
      newCountSuffix: '則新訊息',
      emptyReceivedTitle: '暫未收到關懷訊息',
      emptyReceivedBody: '當您的伴侶在另一支手機發送關懷建議時，訊息會立即顯示在這裡。',
      emptySentTitle: '暫未發送關懷訊息',
      emptySentBody: '前往 AI 關懷頁面，為伴侶送上一份貼心的提醒或問候。',
      exploreAiCare: '前往 AI 關懷',
      relatedSuggestion: '關聯建議：',
      markAsReceived: '標記為已收到',
      markAsCompleted: '標記為已完成',
      statuses: {
        Sent: '已發送',
        Received: '已收到',
        Completed: '已完成',
      },
      todayPrefix: '今天',
      yesterdayPrefix: '昨天',
    },
    profile: {
      roles: {
        alex: '伴侶 A · 展示帳號',
        jamie: '伴侶 B · 展示帳號',
      },
      simulatedDemoProfile: '模擬展示資料',
      languageSectionTitle: '語言設定',
      languageSectionDesc: '切換後兩支手機將同步更新，並自動儲存於本機。',
      languages: {
        en: 'English',
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
      },
      coupleSettingsTitle: '伴侶關係設定',
      partnerName: '伴侶姓名',
      demoPairingCode: '展示配對碼',
      connectionStatus: '連線狀態',
      connectedStatusValue: '已連線 · 共享展示伴侶',
      dataSharingTitle: '資料分享與隱私控制',
      dataSharingDesc: '您可以自主決定允許 {partner} 查看哪些健康摘要，變更會立即生效。',
      energySummaryTitle: '精力摘要',
      energySummaryDesc: '分享每日預估精力指數',
      sleepSummaryTitle: '睡眠摘要',
      sleepSummaryDesc: '分享睡眠時長與睡眠品質評分',
      activitySummaryTitle: '活動摘要',
      activitySummaryDesc: '分享每日活動分鐘數',
      cycleTitle: '生理週期資訊',
      cycleDesc: '選用功能 · 預留給未來版本（預設不啟用）',
      sharingFeedbackOn: '已向 {partner} 開啟「{label}」分享。',
      sharingFeedbackOff: '已向 {partner} 隱藏「{label}」。',
      carePreferencesTitle: '個人關懷偏好',
      carePreferencesDesc: '這些偏好標籤將協助 AI 關懷提供更貼近心意的建議。',
      newPreferencePlaceholder: '新增關懷偏好...',
      addButton: '新增',
      removeTagAria: '移除 {tag}',
      presetTags: {
        alex_short_messages: '簡短鼓勵訊息',
        alex_evening_walks: '輕鬆晚間散步',
        alex_fruit_tea: '水果茶',
        alex_no_surprise_visits: '避免突然造訪',
        jamie_quiet_time: '安靜獨處或陪伴時間',
        jamie_light_dinner: '清淡晚餐',
        jamie_warm_milk_tea: '熱奶茶',
        jamie_gentle_checkins: '輕柔問候',
        jamie_no_crowds: '忙碌後避免擁擠活動',
      },
      membershipTitle: '會員方案',
      demoPricingProposal: '展示定價方案',
      freePlanTitle: '免費版',
      freePrice: 'HK$0',
      perMonth: '/ 月',
      freeBenefits: ['基礎精力摘要', '基礎規律洞察', '有限的關懷建議'],
      premiumPlanTitle: '伴侶尊享版',
      premiumPrice: 'HK$28–38',
      perCoupleMonth: '/ 對 / 月',
      premiumBenefits: [
        '更深入的歷史規律分析',
        '更詳細的未來趨勢預估',
        '高度個人化的關懷建議',
        '歷史關懷偏好洞察紀錄',
      ],
      pricingProposalNote: '港幣參考定價 — 僅作產品展示方案呈現',
      explorePremium: '了解尊享會員',
      premiumModalTitle: '伴侶尊享版說明',
      premiumModalBody:
        '伴侶共享同一份訂閱方案，建議定價為每對伴侶每月 HK$28–38。Alex 與 Jamie 雙方皆可解鎖 60 天深度規律分析、7 天趨勢預估與偏好驅動的專屬關懷建議。',
      premiumModalDisclaimer: '此為會員資訊模擬彈窗 — 本原型不會發起任何真實付款或扣款。',
      premiumConfirmButton: '確認體驗展示方案',
      premiumConfirmedBanner: '已記錄展示體驗意向！正式版本中伴侶雙方僅需一份共同訂閱。',
      closePreview: '關閉',
    },
    activityTemplates: {
      sentCare: '{actor} 向 {target} 發送了「{suggestion}」。',
      savedCare: '{actor} 收藏了「{suggestion}」。',
      completedCare: '{actor} 將「{suggestion}」標記為已完成。',
      seedSupportive: 'Alex 向 Jamie 發送了一則暖心問候。',
      seedSavedEvening: 'Jamie 收藏了一則輕鬆晚間建議。',
    },
    calendar: {
      weekdaysShort: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
      weekdaysFull: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      monthsFull: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
    welcome: {
      headline: '關懷，從讀懂彼此開始。',
      subtitle: '了解伴侶的精力波動規律，發現更貼心、更有分寸的關懷方式。',
      startJourney: '開啟 DualCharge 之旅',
      exploreDemo: '體驗伴侶雙機展示',
      demoFootnote: '全新 Day 1 個人冷啟動 · 與 60 天 Alex & Jamie 雙機展示嚴格隔離',
      returnToWelcome: '歡迎頁',
      enterDemoMode: '雙機展示',
      exitDemoMode: '結束展示',
      personalModeBadge: '個人檢視',
      resumePersonalApp: '以 {name} 的身份繼續',
      loadingPresentationDemo: '正在載入 60 天伴侶雙機展示數據...',
    },
    onboarding: {
      stepCounter: '第 {current} / {total} 步',
      back: '上一步',
      continue: '繼續',
      skipForNow: '暫不設定，略過',
      completeSetup: '開始建立我的精力基線',
      localSetupTag: 'Day 1 個人初始設定',
      step1: {
        title: '先認識一下你吧。',
        subtitle: '建立本機個人檔案。本原型不收集手機號碼、密碼或真實醫療健康紀錄。',
        nicknameLabel: '你的稱呼 / 暱稱',
        nicknamePlaceholder: '請輸入你的稱呼或暱稱',
        nicknameRequiredError: '請輸入稱呼或暱稱後再繼續。',
        avatarLabel: '個人頭像（選填）',
        avatarOptions: {
          'coral-glow': '暖珊瑚',
          'lavender-mist': '柔薰衣草',
          'sage-calm': '鼠尾草',
          'warm-amber': '暖琥珀',
          'photo-a': '肖像 A',
          'photo-b': '肖像 B',
        },
        languageLabel: '介面語言偏好',
      },
      step2: {
        title: '與伴侶建立連結',
        subtitle: '建立邀請碼、輸入伴侶邀請碼，或稍後再邀請伴侶。',
        optionCreate: '建立邀請碼',
        optionJoin: '輸入邀請碼',
        optionLater: '稍後邀請',
        createDesc: '將下方本機模擬邀請碼分享給伴侶，或點擊按鈕在本機模擬配對完成。',
        inviteCodeLabel: '本機邀請碼',
        copyCode: '複製邀請碼',
        copiedCode: '已複製',
        partnerJoinedButton: '模擬伴侶已加入',
        partnerJoinedConfirmed: '已完成本機配對（原型模擬）',
        joinDesc: '輸入 4 位數字邀請碼（如 DC-4829）以在本機模擬與伴侶配對。',
        joinCodeLabel: '伴侶邀請碼',
        joinCodePlaceholder: '請輸入 DC-4829',
        verifyCodeButton: '確認配對',
        invalidCodeError: '請輸入有效的邀請碼（格式 DC-XXXX，例如 DC-4829）。',
        pairingSuccessBanner: '已透過邀請碼 {code} 完成本機原型配對。',
        laterTitle: '暫不配對，先開啟個人體驗',
        laterDesc: '你可以先從 Day 1 開始建立自己的精力基線，隨時前往「我的」頁面邀請伴侶。',
        laterConfirmedBanner: '已選擇「稍後邀請伴侶」，之後可隨時在「我的」中連結。',
        pairingRequiredError: '請完成模擬配對、輸入伴侶邀請碼，或選擇「稍後邀請」後再繼續。',
        localSimulationNote: '僅限本機原型模擬，未連接真實遠端跨裝置伴侶同步。',
      },
      step3: {
        title: '你的數據，由你做主。',
        subtitle: '選擇你願意向伴侶分享的個人狀態摘要。',
        offByDefaultNote: '所有分享開關預設為關閉狀態，僅在你主動開啟後才會共享。',
        privacyFootnote: '你可以隨時在「我的」頁面調整這些權限。',
        cycleFutureBadge: '選用未來功能 · 本原型暫未啟用',
      },
      step4: {
        title: '你喜歡被怎樣溫柔對待？',
        subtitle: '選擇最讓你感到舒適的關懷方式，亦可直接略過此步。',
        preferredCareTitle: '喜歡的關懷方式',
        avoidTitle: '希望避免的安排',
        communicationTitle: '偏好的溝通語氣',
        preferredCareOptions: {
          warm_drinks: '熱飲',
          gentle_messages: '輕柔問候',
          quiet_time: '安靜陪伴/獨處',
          light_meals: '清淡餐食',
          relaxing_walks: '輕鬆散步',
          small_surprises: '小驚喜',
        },
        avoidOptions: {
          crowded_places: '擁擠場所',
          surprise_visits: '突然造訪',
          frequent_messages: '頻繁傳訊息',
          last_minute_plans: '臨時變動計畫',
        },
        communicationOptions: {
          gentle_supportive: '溫柔且體貼支持',
          short_direct: '簡短而直接',
          playful_cheerful: '輕鬆俏皮愉快',
        },
      },
      step5: {
        title: '開始建立你的精力基線',
        subtitle: '你的個人基線從今天正式開始。DualCharge 將依據你主動分享的日常資訊逐步學習。',
        startBaselineTitle: 'Day 1 · 全新個人基線',
        startBaselineBody: '你的歷史紀錄將從 0 開始，每次每日簽到都會累積為你的專屬基線與第 7 天初步洞察。',
        day1Badge: '從第 1 天開始',
        zeroHistoryBadge: '0 筆歷史紀錄',
        firstInsightBadge: '紀錄滿 7 天後解鎖首次初步洞察',
        futureIntegrationsNote: '未來版本將選用支援 Apple Health / Health Connect 等平台串接。',
        noHealthClaimNote: '不會向你的個人帳號匯入任何穿戴裝置數據或展示樣本紀錄。',
        completeBaselineCta: '開始建立我的精力基線',
      },
    },
    normalMode: {
      greetingTemplate: '早安，{name}',
      partnerDisplayName: '伴侶',
      personalRoleLabel: '第 {day} 天 · 個人帳號',
      dayBadgeTemplate: '第 {day} 天',
      baselineBuildingBadge: '基線建立中',
      earlyBaselineBadge: '已產生初步洞察',
      baselineStartingTitle: '你的精力基線正在起步',
      baselineStartingBody:
        'DualCharge 正在開始學習你的日常精力節奏。堅持完成每日狀態簽到，即可逐步建立你的個人基線。',
      firstInsightTimingNote: '累計完成 7 天每日簽到後，將為你產生首次初步洞察。',
      recordedDaysProgress: '已紀錄 {count} / {target} 天',
      checkInSavesBaselineNote: '已儲存至個人紀錄（已紀錄 {count} / 7 天，滿 7 天解鎖初步洞察）。',
      noEnergyIndexYet: '基線建立中',
      avgSelfReportedLabel: '平均主觀精力 ({score} / 5)',
      notEnteredYet: '暫未紀錄',
      invitePartnerTitle: '邀請你的伴侶',
      invitePartnerBody: '正在等待伴侶連結。你可隨時在「我的」頁面完成本機配對並開啟分享。',
      invitePartnerCta: '邀請伴侶',
      waitingForPartnerTitle: '已連結（本機模擬）',
      waitingForPartnerCheckInBody: '正在等待伴侶完成首次每日簽到。',
      pairedStatusValue: '已配對（本機模擬 · {code}）',
      unpairedStatusValue: '等待伴侶連結',
      pairLaterActionHint: '可隨時在「我的」中使用模擬邀請碼完成配對。',
      simulatePartnerJoinNow: '模擬伴侶完成配對 ({code})',
      noCareActivityYet: '暫未產生個人關懷紀錄。',
      insightPreviewBuilding: '你的個人精力基線正在建立中。完成 7 天每日簽到即可解鎖首次初步洞察。',
      insightPreviewEarly: '初步洞察 — 依據你真實紀錄的 {count} 天，平均主觀精力評分為 {avg} / 5。',
      insightsBuildingTitle: '你的個人精力基線正在建立中。',
      insightsBuildingBody: '完成 7 天每日簽到，即可獲得依據你自身數據的首次初步洞察。',
      observedSoFarTitle: '目前已紀錄數據 ({count} / 7 天)',
      observedSoFarEmpty: '暫無每日簽到紀錄。前往首頁完成今日首次簽到，即可開啟第 1 天紀錄。',
      selfReportedScaleNote: '個人主觀精力評分（1–5 分制）',
      earlyInsightBadge: '初步洞察',
      earlyInsightTitle: '初步洞察 — 依據你的前 7 天紀錄',
      earlyInsightSubtitle: '完全依據你親手紀錄的 {count} 天個人簽到數據產生。',
      avgScoreLabel: '平均主觀精力',
      scoreRangeLabel: '紀錄區間',
      dayTransitionsLabel: '相鄰日波動次數',
      mostCommonFeelingLabel: '最常見狀態',
      variationNotes: {
        steady: '在你紀錄的這幾天中，整體精力狀態保持相對平穩。',
        fluctuating: '在你紀錄的這幾天中，日間精力呈現出一定的起伏變化。',
        low_reserve: '在已紀錄的日期中，有較多天傾向於精力偏低或需要多休息。',
      },
      weeklyPatternTitle: '週內規律識別',
      notEnoughWeekdayRepeats: '目前重複觀察次數不足，尚無法識別穩定的每週規律。',
      weeklyPatternRequirementNote:
        '至少需要在 4 個不同自然週中觀察到同一星期幾的有效紀錄（目前單一星期幾最多僅觀察到 {weeks} 週）。',
      preliminaryWeeklyPatternBadge: '初步週規律提示',
      preliminaryWeeklyPatternBody:
        '依據跨 {weeks} 週的真實紀錄初步觀察：{weekday} 平均主觀精力的均值為 {mean} / 5。',
      futureEstimatesInactiveTitle: '未來趨勢預估暫未開啟',
      futureEstimatesInactiveBody: '需累積足夠多週的真實個人歷史數據後，系統才會提供基於歷史規律的未來參考預估。',
      careColdStartTitle: '你的個人化關懷洞察才剛剛起步。',
      careColdStartBody: '隨著我們逐步了解你的日常作息與精力節奏，將能夠提供更貼合的關懷建議。',
      careSourcePreferenceBadge: '依據你主動選擇的偏好',
      careSourceEarlyBaselineBadge: '結合偏好與初期簽到紀錄',
      carePartnerNotPairedNote: '暫未配對伴侶 — 你仍可收藏喜歡的建議，或先在「我的」中配對後再紀錄發送關懷。',
      careLocalSentNote: '已紀錄在你的本機「通知中心」中（本機原型模擬）。',
      careSuggestions: {
        'norm-care-warm-drinks': {
          title: '準備一杯熱飲',
          description: '遞上一杯溫和的熱茶、熱可可或溫開水。',
          reason: '依據你在引導中主動選擇的「熱飲」偏好推薦。',
          timing: '今日方便時隨時',
          defaultMessage: '今天辛苦啦，待會兒想喝杯熱飲慢慢放鬆一下嗎？',
        },
        'norm-care-gentle-messages': {
          title: '發送輕柔問候',
          description: '傳一句簡短溫暖、沒有回覆壓力的關心。',
          reason: '符合你選擇的「輕柔問候」偏好。',
          timing: '午間或傍晚',
          defaultMessage: '不用急著回覆，只是想跟你說聲今天也要照顧好自己，願你一切順心。',
        },
        'norm-care-quiet-time': {
          title: '留出安靜相處時間',
          description: '在家預留 30 分鐘不被打擾、輕鬆安靜的休息時光。',
          reason: '依據你選擇的「安靜陪伴/獨處」偏好推薦。',
          timing: '今晚休息時段',
          defaultMessage: '今晚我們不安排額外瑣事，一起安安靜靜放鬆休息吧。',
        },
        'norm-care-light-meals': {
          title: '安排一頓清淡簡餐',
          description: '準備一頓輕鬆易消化的晚餐，減輕晚間身心負擔。',
          reason: '依據你選擇的「清淡餐食」偏好推薦。',
          timing: '晚餐時段',
          defaultMessage: '今晚我們吃頓清淡省心的晚餐吧，讓身體也好好歇一歇。',
        },
        'norm-care-relaxing-walks': {
          title: '約一場輕鬆散步',
          description: '在安靜的街區一起慢走 15–20 分鐘，呼吸新鮮空氣。',
          reason: '符合你選擇的「輕鬆散步」偏好。',
          timing: '傍晚或晚飯後',
          defaultMessage: '晚飯後要不要一起出去慢慢散步二十分鐘，吹吹風放鬆一下？',
        },
        'norm-care-small-surprises': {
          title: '留一張暖心小紙條',
          description: '準備一句簡短的感謝留言或一個日常小驚喜。',
          reason: '符合你選擇的「小驚喜」偏好。',
          timing: '今日任意時刻',
          defaultMessage: '給你留了一個小小鼓勵，謝謝你一直以來的溫柔陪伴！',
        },
      },
      careContextWindowBuilding: 'Day 1+ · 僅提供基於偏好的日常建議',
      careContextWindowEarly: '初期基線階段 · 非未來趨勢預測',
      notificationsOutgoingOnlyNote: '個人模式中發送的關懷留言僅儲存在本機目前檔案中。',
      modeAndDemoTitle: '展示模式與個人數據管理',
      modeAndDemoDesc: '可隨時進入獨立的 60 天 Alex & Jamie 雙機展示，不會影響你的個人 Day 1+ 紀錄。',
      enterPresentationDemo: '進入雙機展示模式',
      returnToWelcomeBtn: '返回歡迎頁',
      resetOnboardingBtn: '重設個人數據',
      resetOnboardingTitle: '確認清除個人檔案並重設引導？',
      resetOnboardingBody:
        '此操作將清除你的個人暱稱、所有每日簽到紀錄、本機配對、隱私設定與偏好，並返回歡迎頁。雙機展示模式數據不受影響。',
      confirmResetOnboarding: '確認重設',
    },
  },
};

export function formatTemplate(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (acc, [key, val]) => acc.replaceAll(`{${key}}`, String(val)),
    template
  );
}
