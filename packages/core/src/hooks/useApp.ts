import { useContext } from 'react';
import { AppContext } from '../components/App';

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(`useApp must be used within a AppProvider`);
  }
  return context;
}
