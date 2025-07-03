import {
  type IndexRouteObject,
  type NonIndexRouteObject
} from 'react-router-dom';

export type AppRouteMeta = {
  roles?: string[];
};

// Оборачиваем IndexRouteObject
interface AppIndexRouteObject extends IndexRouteObject {
  meta?: AppRouteMeta;
}

// Оборачиваем NonIndexRouteObject
interface AppNonIndexRouteObject extends Omit<NonIndexRouteObject, 'children'> {
  meta?: AppRouteMeta;
  children?: useRouteObject[];
}

export type useRouteObject = AppIndexRouteObject | AppNonIndexRouteObject;
