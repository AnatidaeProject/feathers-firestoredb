import {
  Application,
  Id,
  NullableId,
  Paginated,
  Params,
  Service
} from "@feathersjs/feathers";
import { NotFound } from "@feathersjs/errors";
import _isEmpty from "lodash.isempty";
import isString from "lodash.isstring";
import omit from "lodash.omit";
import uuid from "uuid/v4";

export declare interface Paginate {
  max?: number;
  default?: number;
}

export interface IOptions {
  id?: string;
  events?: any[];
  paginate?: Paginate;
}

export interface IFirestoreDbService<T> extends Service<T> {
  events: any[];
  paginate: Paginate;
  readonly id: string;
  connect(): Promise<any>;
  setup(): Promise<void>;
}

export class DbService {
  public readonly options: IOptions;
  public events: any[] = [];
  private _paginate: Paginate;
  private readonly _id: string;

  constructor(options: IOptions) {
    /* istanbul ignore next */
    if (options.id && ["_rev"].indexOf(options.id) !== -1) {
      throw new Error(`Database id name of ${options.id} is a reserved key`);
    }
    this._id = options.id || "_id";
    this.events = options.events || this.events;
    this._paginate = options.paginate || {};
    this.options = options;
  }

  get id(): string {
    return this._id;
  }

  get paginate(): Paginate {
    return this._paginate;
  }

  set paginate(option: Paginate) {
    this._paginate = option || this._paginate;
  }

  connect() {}
  setup() {}
  get() {}
  find() {}
  create() {}
  update() {}
  patch() {}
  remove() {}

}

export default function FirestoreDbService(options: IOptions): DbService | any {
  return new DbService(options);
}