# Software Architecture

## 1. Overview
PlantSnap is a **Client-Side Single Page Application (SPA)** built with React. It leverages a serverless approach for intelligence by communicating directly with the Google Gemini API. Data persistence for user history is handled via the browser's LocalStorage API, ensuring privacy and zero backend maintenance for user data.

## 2. High-Level Diagram

```mermaid
graph LR
    User[User] -- Uploads Image --> App[React App]
    App -- Sends Image + Prompt --> Gemini[Google Gemini API (2.5 Flash)]
    Gemini -- Returns JSON Data --> App
    App -- Saves Metadata --> LocalStorage[Browser LocalStorage]
    App -- Renders UI --> User
```

## 3. Directory Structure

```text
/
├── components/         # UI Components (Presentational)
│   ├── icons/          # SVG Icon components
│   ├── HomeView.tsx    # Landing page logic
│   ├── HistoryView.tsx # History list and filtering
│   ├── PlantInfoCard.tsx # Detailed result display
│   └── ...
├── services/
│   └── geminiService.ts # API interactions (Prompt engineering & Schema)
├── docs/               # Documentation
├── images/             # Static assets
├── types.ts            # TypeScript interfaces (PlantInfo, HistoryItem)
├── App.tsx             # Main Controller (Routing & State)
└── index.tsx           # Entry point
```

## 4. Key Modules

### 4.1 Gemini Service (`services/geminiService.ts`)
*   **Role**: Abstraction layer between the UI and Google's GenAI SDK.
*   **Implementation**:
    *   Converts `File` objects to Base64.
    *   Constructs a structured prompt asking for JSON output.
    *   Defines `responseSchema` using `@google/genai` types to enforce strict JSON structure for predictable UI rendering.
    *   **Model**: Uses `gemini-2.5-flash` for low latency and high accuracy in multimodal tasks.

### 4.2 State Management (`App.tsx`)
*   **Pattern**: Centralized state in the root component passed down via props.
*   **States**:
    *   `currentView`: Simple routing state ('home' | 'history' | 'about' | 'details').
    *   `plantInfo`: The active search result.
    *   `history`: Array of past searches initialized from LocalStorage.
*   **Persistence**: `useEffect` hooks sync the `history` state array with `localStorage` on every update.

### 4.3 Thumbnail Generation
*   To avoid exceeding LocalStorage quotas (typically 5MB), the app creates a canvas-resized thumbnail (max width 300px) client-side before saving the history item, rather than saving the full-resolution uploaded image.

## 5. Data Models

### PlantInfo (Core Entity)
```typescript
interface PlantInfo {
  commonName: string;
  scientificName: string;
  description: string;
  habitat: string;
  careTips: { watering, sunlight, soil };
  ecoFriendlySolutions: { pestControl, companionPlants };
  healthAssessment: { isHealthy, issues, treatment };
}
```

## 6. Future Considerations
*   **PWA Support**: Adding a service worker to cache the app shell for offline usage.
*   **Backend Sync**: Currently history is local-only. A backend (Firebase/Supabase) would be needed to sync history across devices.
*   **Rate Limiting**: Implementing better error handling for API quota limits.
