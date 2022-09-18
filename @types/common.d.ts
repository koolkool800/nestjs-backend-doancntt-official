interface IEntity {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  slug?: string;
  keyword?: string;
}

interface IResultFilter<T> {
  results: T[];
  totalCount: number;
}
type IEntityUpdate<T> = Omit<T, keyof IEntity>;
