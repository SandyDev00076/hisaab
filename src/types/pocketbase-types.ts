/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Expenses = "expenses",
	Items = "items",
	Sets = "sets",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ExpensesRecord = {
	set: string
	amount?: number
	name: string
	description?: string
}

export type ItemsRecord = {
	item: string
}

export type SetsRecord = {
	name: string
	userId: string
	expense?: number
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ExpensesResponse = ExpensesRecord & BaseSystemFields
export type ItemsResponse = ItemsRecord & BaseSystemFields
export type SetsResponse = SetsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	expenses: ExpensesRecord
	items: ItemsRecord
	sets: SetsRecord
	users: UsersRecord
}