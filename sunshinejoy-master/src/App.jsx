import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import shallow from "zustand/shallow";
import serverInstance from "./api";
import ProtectedRoute from "./components/common/ProtectedRoute";
import EditorExport from "./components/Editor";
import useAppStore from "./hooks/useAppStore";
import { useGoogleAuth } from "./hooks/useGoogleAuth";
import { usePrices } from "./hooks/usePrices";
import { useQueryParams } from "./hooks/useQueryParams";
import Account from "./pages/Account";
import DraftEditor from "./pages/Account/draftEditor";
import Drafts from "./pages/Account/drafts";
import Orders from "./pages/Account/myorders";
import Order from "./pages/Account/myorders/OrderDetail";
import UserPage from "./pages/Account/user";
import AdminEditor from "./pages/AdminEditor";
import AdminOrder from "./pages/AdminOrder";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import GoogleRedirect from "./pages/GoogleRedirect";

import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import Shop from "./pages/Shop";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UnderConstruction from "./components/common/UnderConstruction";
import UnderConstructionV2 from "./components/common/UnderConstructionV2";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/faq",
    element: <FAQs />,
    index: true,
  },
  {
    path: "/contact",
    element: <Contact />,
    index: true,
  },
  {
    path: "/terms",
    element: <TermsAndConditions />,
    index: true,
  },
  {
    path: "/refund-policy",
    element: <RefundPolicy />,
    index: true,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    index: true,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/editor",
    element: <EditorExport />,
  },
  {
    path: "/admin-editor",
    element: <AdminEditor />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/google-redirect",
    element: <GoogleRedirect />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin-order",
    element: <AdminOrder />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/user",
        element: <UserPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/drafts",
        element: <Drafts />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/mygifts",
        element: <Orders />,
      },
    ],
  },
  {
    element : <ProtectedRoute/>,
    children : [
      {
        path : '/account/mygifts/:id',
        element : <Order/>
      }
    ]
  },
  {
    element : <ProtectedRoute/>,
    children : [
      {
        path : '/account/drafts/:id',
        element : <DraftEditor/>
      }
    ]
  }
]);

const App = () => {
  const {p} = usePrices();
  return (
    <>
     <RouterProvider router={router} /> 
    </>
  );
};

export default App;
