import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const boardService = {
	query,
	save,
	remove,
	getById,
	getCmpInfo,
	//   getDefaultFilter,
	//   getFilterFromSearchParams,
}

const STORAGE_KEY = 'boards'
_createBoards()
async function query(filterBy = {}) {
	try {
		let boards = await storageService.query(STORAGE_KEY)
		// if (filterBy.title) {
		// 	const nameRegex = new RegExp(filterBy.title, 'i')
		// 	boards = boards.filter((board) => nameRegex.test(board.title))
		// }

		return boards
	} catch (error) {
		console.log('error:', error)
		throw error
	}
}

async function getById(id) {
	return await storageService.get(STORAGE_KEY, id)
}

async function remove(id) {
	return await storageService.remove(STORAGE_KEY, id)
}

async function save(boardToSave) {
	if (boardToSave._id) {
		return await storageService.put(STORAGE_KEY, boardToSave)
	} else {
		return await storageService.post(STORAGE_KEY, boardToSave)
	}
}

function getCmpInfo(cmpType) {
    const cmp = cmps.find((cmp) => cmp.type === cmpType);
    // console.log('getCmpInfo:', { cmpType, cmp });
    return cmp?.info;
}

// function getDefaultFilter() {
// 	return {
// 		title: '',
// 	}
// }

// function getFilterFromSearchParams(searchParams) {
// 	const defaultFilter = getDefaultFilter()
// 	const filterBy = {}
// 	for (const field in defaultFilter) {
// 		filterBy[field] = searchParams.get(field) || ''
// 	}
// 	return filterBy
// }

function _createBoards() {
	let boards = utilService.loadFromStorage(STORAGE_KEY)
	if (!boards || !boards.length)
	{
		const boards = [
			{
			_id: "b101",
			title: "Robot dev proj",
			isStarred: false,
			archivedAt: 1589983468418,
			createdBy: {
				_id: "u101",
				fullname: "Abi Abambi",
				imgUrl: "http://some-img"
			},
			style: {},
			labels: [

					// Status Labels (l101 - l199)
					{ id: 'l101', title: 'Done', color: '#61bd4f' },
					{ id: 'l102', title: 'In Progress', color: '#ff9f1a' },
					{ id: 'l103', title: 'Stuck', color: '#eb5a46' },
					{ id: 'l104', title: 'Ready', color: '#00c875' },
					{ id: 'l105', title: 'Waiting for Review', color: '#faa53d' },
				  
					// Priority Labels (l201 - l299)
					{ id: 'l201', title: 'High', color: '#e2445c' },
					{ id: 'l202', title: 'Medium', color: '#fbbc04' },
					{ id: 'l203', title: 'Low', color: '#cab641' },
					{ id: 'l204', title: 'Critical', color: '#a0250f' },
					{ id: 'l205', title: 'Optional', color: '#9d99ff' },
				  
					// Member Labels (l301 - l399)
					{ id: 'l301', title: 'Frontend Team', color: '#579bfc' },
					{ id: 'l302', title: 'Backend Team', color: '#bbd676' },
					{ id: 'l303', title: 'QA Team', color: '#f5dd29' },
					{ id: 'l304', title: 'Product Team', color: '#fdab3d' },
					{ id: 'l305', title: 'Design Team', color: '#ff642e' },
				  
					// Task Type Labels (l401 - l499)
					{ id: 'l401', title: 'Bug', color: '#a25ddc' },
					{ id: 'l402', title: 'Feature', color: '#7f5347' },
					{ id: 'l403', title: 'Chore', color: '#d3d3d3' },
					{ id: 'l404', title: 'Epic', color: '#ffadad' },
					{ id: 'l405', title: 'Improvement', color: '#29cc8e' },
				  
					// Custom Labels (l501 - l599)
					{ id: 'l501', title: 'Customer Request', color: '#ff9d76' },
					{ id: 'l502', title: 'Blocked', color: '#4eccc6' },
					{ id: 'l503', title: 'Research', color: '#b3bac5' },
					{ id: 'l504', title: 'Planning', color: '#2a71d0' },
					{ id: 'l505', title: 'Delayed', color: '#ff0000' },
			],
			members: [
				{
					_id: "u101",
					fullname: "Tal Tarablus",
					imgUrl: "https://www.google.com"
				}
			],
			groups: [
				{
					id: "g101",
					title: "Group 1",
					archivedAt: 1589983468418,
					tasks: [
						{
							id: "c101",
							title: "Replace logo"
						},
						{
							id: "c102",
							title: "Add Samples"
						}
					],
					style: {}
				},
				{
					id: "g102",
					title: "Group 2",
					tasks: [
						{
							id: "c103",
							title: "Do that",
							archivedAt: 1589983468418,
						},
						{
							id: "c104",
							title: "Help me",
							status: "l101", // monday
							priority: "l201",
							description: "description",
							comments: [
								{
									id: "ZdPnm",
									txt: "also @yaronb please CR this",
									createdAt: 1590999817436,
									byMember: {
										_id: "u101",
										fullname: "Tal Tarablus",
										imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
									}
								}
							],
							checklists: [
								{
									id: "YEhmF",
									title: "Checklist",
									todos: [
										{
											id: "212jX",
											title: "To Do 1",
											isDone: false
										}
									]
								}
							],
							memberIds: ["u101"],
							labelIds: ["l101", "l102"],
							dueDate: 16156215211,
							byMember: {
								_id: "u101",
								username: "Tal",
								fullname: "Tal Tarablus",
								imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
							},
							style: {
								bgColor: "#26de81"
							}
						}
					],
					style: {}
				}
			],
			activities: [
				{
					id: "a101",
					txt: "Changed Color",
					createdAt: 154514,
					byMember: {
						_id: "u101",
						fullname: "Abi Abambi",
						imgUrl: "http://some-img"
					},
					task: {
						id: "c101",
						title: "Replace Logo"
					}
				}
			],
		  
			cmpsOrder: ['status', 'priority', 'byMember', 'dueDate'],
			cmpTitles: ['Status', 'Priority', 'Members', 'Due Date'],
			groupSummary: [null, null, null],
		}
	]
	
	utilService.saveToStorage(STORAGE_KEY, boards)
	}
}

const cmps = [
	{
		type: 'status',
		info: {
			selectedStatus: 'pending',
			statuses: [{}, {}],
		},
	},

	{
		type: 'byMember',
		info: {
			selectedMembers: ['m1', 'm2'],
			members: ['m1', 'm2', 'm3'],
		},
	},

	{
		type: 'priority',
		info: {
			selectedPriority: 'low',
			priorities: [{}, {}],
		},
	},

	{
		type: 'date',
		info: {
			selectedDate: '2022-09-07',
		},
	},
]
