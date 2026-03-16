'use client';

import { useMemo } from 'react';
import type { NavItem } from '@/types';

export function useFilteredNavItems(items: NavItem[]) {
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (!item.access) return true;
        // Without organization/RBAC, only show items that don't require org
        if (item.access.requireOrg) return false;
        return true;
      })
      .map((item) => {
        if (item.items && item.items.length > 0) {
          const filteredChildren = item.items.filter((childItem) => {
            if (!childItem.access) return true;
            if (childItem.access.requireOrg) return false;
            return true;
          });
          return { ...item, items: filteredChildren };
        }
        return item;
      });
  }, [items]);

  return filteredItems;
}
