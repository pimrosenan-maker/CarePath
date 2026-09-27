import { useState } from 'react';
import { AssessmentPage } from '@/src/screens/AssessmentPage';
import { LandingPage } from '@/src/screens/LandingPage';

export default function App() {
    const [started, setStarted] = useState(false);

    if (!started) {
        return <LandingPage onStart={() => setStarted(true)} />;
    }

    return <AssessmentPage />;
}
