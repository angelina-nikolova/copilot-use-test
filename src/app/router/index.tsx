import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../Layout';
import { HomePage } from '../../pages/HomePage';
import { JournalsPage } from '../../pages/JournalsPage';
import { JournalEntryPage } from '../../pages/JournalEntryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'journals',
        element: <JournalsPage />,
      },
      {
        path: 'journal/:id',
        element: <JournalEntryPage />,
      },
    ],
  },
]);
