import { Subject, Observable, BehaviorSubject } from "rxjs";

// 数据类型
export type NmData<T> = T | BehaviorSubject<T> | Subject<T> | Observable<T>;
