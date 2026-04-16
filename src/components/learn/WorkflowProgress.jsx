function WorkflowProgress({ completedCount, totalPages }) {
  const percent = totalPages > 0 ? Math.round((completedCount / totalPages) * 100) : 0;

  return (
    <div className="ovl-wf-progress">
      <div className="ovl-wf-progress-bar">
        <div
          className="ovl-wf-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="ovl-wf-progress-text">
        {completedCount} of {totalPages} completed ({percent}%)
      </span>
    </div>
  );
}

export default WorkflowProgress;
