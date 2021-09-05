

export const isNotEmpty = taskDescription => taskDescription && taskDescription.trim()
export const serializeData = data => btoa(JSON.stringify(data))
export const desializeData = data => JSON.parse(atob(data))