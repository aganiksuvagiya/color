export function awardPointsClient(action: "EXPORT_CSS" | "SHARE_PALETTE" | "DAILY_VISIT") {
  fetch("/api/points/award", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  }).catch(() => {});
}
