// In: app/loading.js

import GlobalLoader from "@components/GlobalLoader/GlobalLoader";

export default function Loading() {
  // This will be shown instantly on route changes while the new page loads.
  return <GlobalLoader />;
}
