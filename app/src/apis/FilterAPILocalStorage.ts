import { Filter } from "./models/Filter";

export class FilterAPILocalStorage{

    private _storage:Storage;

    constructor(storage:Storage){
        this._storage = storage;
    }

    public saveFilter(filter:Filter){
        if(!this._storage){
            console.error("Storage cannot be null. Filter will not be added");
            return;
        }

        console.log("Save filter!", filter);

        const filtersStorage = this._storage.getItem("filters");
        let filters = JSON.parse(filtersStorage);

        if(filters){
            filters.push(filter);
        }else{
            filters = [filter];
        }

        const filtersToSave = JSON.stringify(filters);
        this._storage.setItem("filters", filtersToSave);
    }
}