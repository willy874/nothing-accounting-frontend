/**
 * @type {AccountState}
 */
export const account = {
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
 *   model: AccountModel,
 *   callback: ActionCallback<AccountModel>
 * }>}
 */
export function updateAccountCollection(store, payload) {
  const {
    model,
    callback
  } = payload
  if (model.id) {
    account.collection[model.id] = model
    callback(model)
  }
}

/**
 * @type {StoreAction<{
 *   id: number,
 *   callback: ActionCallback<AccountModel>
 * }>}
 */
export function deleteAccountCollection() {}