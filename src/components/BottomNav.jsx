import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      name: "Home",
      path: "/",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M3 10.5 12 3l9 7.5v10a.5.5 0 0 1-.5.5H15v-6H9v6H3.5a.5.5 0 0 1-.5-.5v-10Z" />
        </svg>
      ),
    },
    {
      name: "Categories",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M5 3h14l2 4-3 2v12H6V9L3 7l2-4Zm3 2L7 8v11h10V8l-1-3h-2v5h-4V5H8Z" />
        </svg>
      ),
    },
    {
      name: "My Orders",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="m3 7 9-4 9 4v10l-9 4-9-4V7Zm9-2L6 7.7l6 2.7 6-2.7L12 5Zm-7 4.2v6.5l6 2.7v-6.5L5 9.2Zm8 9.2 6-2.7V9.2l-6 2.7v6.5Z" />
        </svg>
      ),
    },
    {
      name: "Help",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M5 3h14v18H5V3Zm2 2v14h10V5H7Zm4 10h2v2h-2v-2Zm1-9c2.1 0 3.5 1.2 3.5 3 0 1.4-.8 2.1-1.8 2.8-.7.5-.9.8-.9 1.5h-1.7c0-1.4.5-2 1.5-2.7.8-.6 1.2-.9 1.2-1.6 0-.8-.6-1.3-1.6-1.3-.9 0-1.6.4-2.2 1.1L9 7.7C9.8 6.6 10.8 6 12 6Z" />
        </svg>
      ),
    },
    {
      name: "Account",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 10c5 0 8 2.5 8 6v1H4v-1c0-3.5 3-6 8-6Zm0 2c-3.2 0-5.2 1.1-5.8 3h11.6c-.6-1.9-2.6-3-5.8-3Z" />
        </svg>
      ),
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Bottom spacing so content is not hidden */}
      <div className="h-[64px] md:hidden" />

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-[9999]

          mx-auto

          flex
          h-[62px]
          w-full
          max-w-[1280px]

          items-center
          justify-around

          border-t
          border-gray-200

          bg-white

          shadow-[0_-2px_8px_rgba(0,0,0,0.08)]

          md:hidden
        "
      >
        {items.map((item) => {
          const active = isActive(item.path);

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                navigate(item.path);
                window.scrollTo(0, 0);
              }}
              className="
                flex
                h-full
                min-w-[60px]
                flex-1
                flex-col
                items-center
                justify-center
                gap-[2px]
              "
            >
              <span
                className={`
                  flex
                  h-[25px]
                  w-[25px]
                  items-center
                  justify-center

                  [&>svg]:h-[24px]
                  [&>svg]:w-[24px]

                  ${
                    active
                      ? "[&>svg]:fill-[#9f2089]"
                      : "[&>svg]:fill-none [&>svg]:stroke-[#353543] [&>svg]:stroke-[1]"
                  }
                `}
              >
                {item.icon}
              </span>

              <span
                className={`
                  text-[11px]
                  leading-[14px]

                  ${
                    active
                      ? "font-semibold text-[#9f2089]"
                      : "font-medium text-[#111111]"
                  }
                `}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}