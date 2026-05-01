
# 🩸 Women's Health Dashboard: Desktop Transition
Bridging the gap between mobile-first health tracking and desktop-driven data analysis.
Inspired by industry-leading apps like Clue, this project explores the transition of intimate health tracking from a mobile-first experience into a comprehensive, high-utility desktop dashboard. The goal was to maintain the ease of mobile logging while leveraging the screen real estate of a desktop for deeper data insights.

# 🌟 Key Features
## 🔐 User-Specific Data Integration
To simulate a production-ready environment, I implemented a robust Login System.

**Dynamic Data Fetching:** The app communicates with a User API to retrieve personalized history logs.

**State Persistence:** History, cycle trends, and logs are specific to the authenticated user, ensuring data integrity.

## 📱 Adaptive Data Architecture
Data density is a challenge when moving between platforms. I designed a custom responsive table structure to solve this:

**Desktop:** A comprehensive multi-column view for deep-diving into monthly trends.

**Mobile:** A condensed, card-based or simplified table view that preserves readability without sacrificing information.

## 📝 Seamless Symptom Logging
Built a specialized Modal System for symptom registration to minimize friction.

**In-Context Updates:** Users can log symptoms, moods, or flow intensity instantly without navigating away from their current dashboard view.

**Optimized UX:** The modal focuses the user's attention, making daily health updates quick and effortless.

## 🛠 Tech Stack
**Front-End:** [e.g., React / Next.js / Vite]

**Authentication:** [e.g., JWT / Firebase / Mock API]

**Styling:** [e.g., Tailwind CSS / CSS Modules]

**State Management:** [e.g., Context API / Redux / TanStack Query]

## 📐 Design Decisions
**Mobile-to-Desktop Translation:** Focused on "Information Hierarchy"—using the extra desktop space for charts and logs while keeping the primary "Add Log" actions accessible via the modal.

**Accessibility:** Prioritized clear typography and high-contrast indicators for health status to ensure the dashboard is inclusive and easy to navigate.