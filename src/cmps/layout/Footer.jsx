import React, { useState } from 'react';
import { updateBoard } from '../../store/board/board.actions';
import * as XLSX from 'xlsx';
import { utilService } from '../../services/util.service';

export function Footer({ board, checkedTasks = [] }) {
  const [showDuplicateOptions, setShowDuplicateOptions] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeUpdates: false,
    includeSubitems: false,
    emailCopy: false,
  });

  function getGroupByTask(task) {
    return board.groups.find((group) =>
      group.tasks.some((t) => t.id === task.id)
    );
  }

  function handleDuplicateOption(option) {
	console.log('Checked tasks:', checkedTasks);
  
	checkedTasks.forEach((checkedTask) => {
	  const group = getGroupByTask(checkedTask);
	  if (!group) {
		console.error('No group found for task:', checkedTask);
		return;
	  }
  
	  const newTask = {
		...checkedTask,
		id: utilService.makeId(), // Generate a new unique ID
		title: `${checkedTask.title} (copy)`,
	  };
  
	  if (option === 'withUpdates') {
		newTask.updates = checkedTask.updates || []; // Retain updates if present
	  }
  
	  group.tasks.push(newTask);
  
	  console.log('Updated group:', group);
  
	  // Pass the updated board and group to updateBoard
	  try {
		updateBoard(board, group.id, null, {
		  key: 'tasks',
		  value: group.tasks,
		});
	  } catch (error) {
		console.error('Error in updateBoard:', error);
	  }
	});
  }
  
function handleDuplicate() {
    setShowDuplicateOptions(true);
}

const handleExportChange = (option) => {
    setExportOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const handleExport = () => {
	const headers = ['Item', ...board.cmpTitles]; 
	const data = checkedTasks.map((task) => [
	  task.title, 
	  ...board.cmpTitles.map((cmpTitle) => {

		switch (cmpTitle) {
		  case 'Status':
			return task.status || '';
		  case 'Priority':
			return task.priority || '';
		  case 'Members':
			return (task.memberIds || []).join(', '); 
		  case 'Due Date':
			return task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''; 
		  default:
			return ''; // Fallback for unmapped titles
		}
	  }),
	]);

    // Create the XLSX data
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, board.title || 'Export');

    // Trigger file download
    XLSX.writeFile(workbook, `${board.title || 'Export'}.xlsx`);

    // Close the modal
    setShowExportModal(false);
  };
//   function handleExport() {
//     if (!checkedTasks || checkedTasks.length === 0) {
//       console.warn('No tasks selected for export.');
//       return;
//     }

//     const headers = [...board.cmpTitles];
//     const data = checkedTasks.map((task) =>
//       headers.map((header) => task[header])
//     );

//     const excelData = [headers, ...data];
//     const worksheet = XLSX.utils.aoa_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Checked Tasks');
//     XLSX.writeFile(workbook, 'checked_tasks.xlsx');
//   }

  function handleArchive() {
    console.log('Archive');
  }

  function handleDelete() {
    checkedTasks.forEach((checkedTask) => {
      const group = getGroupByTask(checkedTask);
      group.tasks = group.tasks.filter((task) => task.id !== checkedTask.id);
    });
    updateBoard(board);
  }

  function handleConvert() {
    console.log('Convert');
  }

  function handleMoveTo(newLocationObject) {
    checkedTasks.forEach((checkedTask) => {
      const group = getGroupByTask(checkedTask);
      group.tasks = group.tasks.filter((task) => task.id !== checkedTask.id);
      const targetGroup = newLocationObject.board.groups.find(
        (g) => g.id === newLocationObject.groupId
      );
      targetGroup.tasks.push(checkedTask);
    });
    updateBoard(board);
  }

  function handleApps() {
    console.log('Apps');
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-number">
          <h1>{checkedTasks?.length}</h1>
        </div>
        <div className="footer-items-selected">
          <h1>Items Selected</h1>
          <div className="footer-balls">
            {checkedTasks.map((_, idx) => (
              <div key={idx} className="ball"></div>
            ))}
          </div>
        </div>
        <div className="footer-actions">
          <div onClick={handleDuplicate} className="footer-action">
            <span>...</span>
            <span>Duplicate</span>
          </div>
          <div onClick={() => setShowExportModal(true)} className="footer-action">
          <span>...</span>
          <span>Export</span>
        </div>
          <div onClick={handleArchive} className="footer-action">
            <span>...</span>
            <span>Archive</span>
          </div>
          <div onClick={handleDelete} className="footer-action">
            <span>...</span>
            <span>Delete</span>
          </div>
          <div onClick={handleConvert} className="footer-action" disabled>
            <span>...</span>
            <span>Convert</span>
          </div>
          <div onClick={handleMoveTo} className="footer-action">
            <span>...</span>
            <span>Move to</span>
          </div>
          <div onClick={handleApps} className="footer-action">
            <span>...</span>
            <span>Apps</span>
          </div>
        </div>
        {showDuplicateOptions && (
          <div className="modal">
            <h2>Duplicate Options</h2>
            <button onClick={() => handleDuplicateOption('withoutUpdates')}>
              Duplicate Items
            </button>
            <button onClick={() => handleDuplicateOption('withUpdates')}>
              Duplicate Items & Updates
            </button>
            <button onClick={() => setShowDuplicateOptions(false)}>Cancel</button>
          </div>
        )}
		
        {/* Export Modal */}
        {showExportModal && (
          <div className="modal">
            <h2>Export "{board.title}"</h2>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={exportOptions.includeUpdates}
                  onChange={() => handleExportChange('includeUpdates')}
                />
                Include updates
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={exportOptions.includeSubitems}
                  onChange={() => handleExportChange('includeSubitems')}
                />
                Include subitems
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={exportOptions.emailCopy}
                  onChange={() => handleExportChange('emailCopy')}
                />
                Email me a copy ({board.email || 'example@example.com'})
              </label>
            </div>
            <div className="modal-buttons">
              <button onClick={handleExport}>Export</button>
              <button onClick={() => setShowExportModal(false)}>Cancel</button>
            </div>
          </div>
        )}
        <div className="footer-close">
          <div>X</div>
        </div>
      </div>
    </footer>
  );
}
