import { MongoClient, ObjectID } from 'mongodb'

class MongoDBConnector {
	constructor (connectionUrl, databaseName) {
		if (typeof connectionUrl !== 'string' || connectionUrl.length === 0) {
			throw new Error('Invalid Connection URL')
		}
		this.client = new MongoClient(connectionUrl, { useNewUrlParser: true })
		this.databaseName = databaseName
	}

	async connect () {
		this.connection = await this.client.connect()
		this.db = await this.client.db(this.databaseName)
	}

	closeConnection () {
		this.connection.close()
		this.db = null
	}

	async findById (collectionName, id = '') {
		if (typeof id !== 'string' || id === '') {
			throw new Error('Invalid ID provided')
		}
		const result = await this.db.collection(collectionName)
			.findOne({ _id: new ObjectID(id) })
		return result
	}

	async find (collectionName, queryObj = {}, limit = 0) {
		if (Object.keys(queryObj) === 0) {
			throw new Error('Invalid Search Object')
		}

		const opts = { limit }
		const result = await this.db.collection(collectionName)
			.find(queryObj, opts).toArray()
		return result
	}

	async findOne (collectionName, queryObj = {}) {
		if (Object.keys(queryObj) === 0) {
			throw new Error('Invalid Search Object')
		}

		const result = await this.db.collection(collectionName)
			.findOne(queryObj)
		return result
	}

	async insertOne (collectionName, data = {}) {
		if (Object.keys(data) === 0) {
			throw new Error('Empty object cannot be saved')
		}

		const opts = { wtimeout: 1000 }
		const result = await this.db.collection(collectionName)
			.insertOne(data, opts)
		return result
	}

	async insertMany (collectionName, items = []) {
		if (!Array.isArray(items) || items.length === 0) {
			throw new Error('Invalid items array')
		}

		const opts = { wtimeout: 1000 }
		const result = await this.db.collection(collectionName)
			.insertMany(items, opts)
		return result
	}

	async deleteById (collectionName, id = '') {
		if (typeof id !== 'string' || id === '') {
			throw new Error('Invalid ID provided')
		}

		const opts = { wtimeout: 1000 }
		const result = await this.db.collection(collectionName)
			.findOneAndDelete({ _id: new ObjectID(id) }, opts)
		return result
	}

	async deleteMany (collectionName, filter = {}) {
		if (Object.keys(filter) === 0) {
			throw new Error('Empty filter object')
		}

		const opts = { wtimeout: 1000 }
		const result = await this.db.collection(collectionName)
			.deleteMany(filter, opts)
		return result
	}

	async updateById (collectionName, id = '', data = {}, upsert = false) {
		if (typeof id !== 'string' || id === '') {
			throw new Error('Invalid ID provided')
		}

		const opts = { upsert }
		const result = await this.db.collection(collectionName)
			.findOneAndUpdate({ _id: new ObjectID(id) }, data, opts)
		return result
	}

	async updateMany (collectionName, filter = {}, data = {}, upsert) {
		if (Object.keys(filter) === 0) {
			throw new Error('Empty filter object')
		}
		if (Object.keys(data) === 0) {
			throw new Error('Empty data object')
		}

		const opts = { upsert }
		const result = await this.db.collection(collectionName)
			.updateMany(filter, data, opts)
		return result
	}
}

export default MongoDBConnector
export { MongoDBConnector }
