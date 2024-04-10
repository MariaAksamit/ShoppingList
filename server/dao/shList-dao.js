"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = (path.join(__dirname, "..", "storage", "lists.json"), "utf-8");

class ListDao {
  constructor(storagePath) {
    this.listStoragePath = storagePath
      ? storagePath
      : DEFAULT_STORAGE_PATH;
  }

  async createList(list) {
    let listList = await this._loadAllLists();
    list.id = crypto.randomBytes(4).toString("hex");
    listList.push(list);
    await wf(
      this._getStorageLocation(),
      JSON.stringify(listList, null, 2)
    );
    return list;
  }

  async getList(id) {
    let list = await this._loadAllLists();
    const result = list.find((b) => b.id === id);
    return result;
  }

  async updateList(list) {
    let listList = await this._loadAllLists();
    const listIndex = listList.findIndex(
      (b) => b.id === list.id
    );
    if (listIndex < 0) {
      throw new Error(
        `List with given id ${list.id} does not exists.`
      );
    } else {
      listList[listIndex] = {
        ...listList[listIndex],
        ...list,
      };
    }
    await wf(
      this._getStorageLocation(),
      JSON.stringify(listList, null, 2)
    );
    return listList[listIndex];
  }

  async deleteList(id) {
    let listList = await this._loadAllLists();
    const listIndex = listList.findIndex((b) => b.id === id);
    if (listIndex >= 0) {
      listList.splice(listIndex, 1);
    }
    await wf(
      this._getStorageLocation(),
      JSON.stringify(listList, null, 2)
    );
    return {};
  }

  async listLists() {
    let listList = await this._loadAllLists();
    return listList;
  }

  async _loadAllLists() {
    let listList;
    try {
      listList = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        listList = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return listList;
  }

  _getStorageLocation() {
    return this.listStoragePath;
  }
}

module.exports = ListDao;