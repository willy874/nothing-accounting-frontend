/**
 * @type {ExampleState}
 */
export const example = {
  collection: {},
  getList() {
    const list = []
    for (const key in this.collection) {
      const value = this.collection[key]
      if (value) {
        list.push(value)
      }
    }
    return list
  }
}

/**
 * @type {StoreAction<{
 *   model: ExampleModel,
 *   callback: ActionCallback<ExampleModel>
 * }>}
 */
export function updateExampleCollection(store, payload) {
  const {
    model,
    callback
  } = payload
  if (model.id) {
    example.collection[model.id] = model
    callback(model)
  }
}

/**
 * @type {StoreAction<{
 *   id: number,
 *   callback: ActionCallback<ExampleModel>
 * }>}
 */
export function deleteExampleCollection() {}