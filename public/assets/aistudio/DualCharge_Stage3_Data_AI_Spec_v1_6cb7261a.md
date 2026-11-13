# DualCharge — Stage 3 Data & AI Specification v1.0

## 1. Demo data
- Dataset: 60 days, two fictional partners, 120 daily records.
- Date range: 2026-09-15 to 2026-11-13.
- Fields: date, weekday, partner_id, sleep_hours, sleep_quality_1_to_5, activity_minutes, self_reported_energy_1_to_5, estimated_energy_index_0_to_100, is_simulated.
- All data is fictional. Do not present it as real health data or medically validated output.

## 2. Energy indicator
For the first demo only:
- sleep_duration_score = min(sleep_hours / 8 * 100, 100)
- sleep_quality_score = (sleep_quality_1_to_5 - 1) / 4 * 100
- self_report_score = (self_reported_energy_1_to_5 - 1) / 4 * 100
- estimated_energy_index = 0.30 * sleep_duration_score + 0.20 * sleep_quality_score + 0.50 * self_report_score

Activity minutes are context only in v1; do not assume more activity always means more or less energy. Resting heart rate and menstrual-cycle data are excluded from v1. The index is a product-demo indicator, not a medical measurement or emotion detector.

## 3. Pattern detection (transparent baseline, not a trained ML claim)
For each partner:
1. Calculate the overall mean energy index across the available 60 days.
2. Group records by weekday and calculate count, mean, and proportion of values at least 8 points below the overall mean.
3. Flag a recurring low-energy weekday only when count >= 6, weekday mean <= overall mean - 12, and at least 60% of observations on that weekday are <= overall mean - 8.
4. Check the prior day's mean sleep duration as possible supporting context; report association only, not causation.
5. If minimum data requirements are not met, return “insufficient history” and avoid a confident prediction.

## 4. Seven-day estimate
- For each upcoming weekday, calculate weekday_mean from historical data.
- Calculate recent_mean from the latest 7 days.
- estimated_future_energy = 0.75 * weekday_mean + 0.25 * recent_mean.
- Round to an integer and label it “pattern-based estimate”.
- This is a simple explainable demo baseline, not a clinically validated forecast or advanced machine-learning model.
- Confidence is “low” unless there are >= 6 observations for that weekday and the recurring-pattern rule is met; even then use “moderate”, never “high” for this prototype.

## 5. Gemini's role
The statistical layer computes metrics and candidate insights. Gemini must not invent or recalculate the underlying evidence. Gemini receives:
- one partner's computed summary,
- qualifying weekday patterns and supporting counts,
- next-7-day estimates,
- user-authorized care preferences and prior care feedback,
- privacy-safe shared context only.

Gemini returns structured JSON with:
- insight_title
- pattern_summary
- evidence (weekday, sample_count, mean_energy_index, overall_mean, prior_day_sleep_context)
- predictions (date, predicted_energy_index, confidence, explanation)
- care_recommendations (title, action, why_this_fits, suggested_time, action_type)
- limitations

Recommendations must not infer food preferences from health data. Use only preferences explicitly provided by the user. Offer non-purchase actions as well as purchase-related options. Never diagnose, assert emotions, or imply certainty.

## 6. Example Gemini instruction
“You are DualCharge's care assistant. Explain only the supplied computed patterns. Separate observed historical data from estimates. Do not invent statistics. Do not diagnose or infer mood. Use the recipient's stated preferences to propose 2–3 optional, respectful actions, including at least one non-purchase option. Return valid JSON matching the requested schema. If evidence is insufficient, say so and do not manufacture a prediction.”

## 7. MVP acceptance criteria
- Load both 60-day datasets without manual edits.
- Display the same date range and values consistently across Home and Insights.
- Partner B shows a recurring lower-energy Thursday pattern in the demo summary; Partner A remains relatively stable.
- Every pattern includes sample count and comparison with personal baseline.
- Future 7-day estimates are derived from the transparent formula above.
- Gemini suggestions cite only supplied evidence and respect stated preferences.
- UI labels all data as simulated demo data.
