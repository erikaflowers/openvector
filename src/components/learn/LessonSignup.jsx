import NotifyForm from '../NotifyForm';

// End-of-lesson email capture. The pitch is true because the Open Vector Autopilot
// keeps lessons current and the weekly digest lists what changed.
function LessonSignup() {
  return (
    <section className="ovl-lesson-signup" aria-label="Get Open Vector updates">
      <div className="ovl-lesson-signup-label">This lesson stays current</div>
      <p className="ovl-lesson-signup-text">
        AI tools change every week, and these lessons change with them. Get a short email when lessons
        change and when something new lands.
      </p>
      <NotifyForm
        variant="learn"
        tag="zerovector"
        source="lesson-end"
        buttonLabel="Send me updates"
        successText="You're in. Watch for the next Open Vector update."
      />
    </section>
  );
}

export default LessonSignup;
