import { useState, useLayoutEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  wrapperId?: string;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  // function that creates a wrapper for our element
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  // wrapperElement.setAttribute("class", "modal");
  document.body.append(wrapperElement);

  return wrapperElement;
}

function Portal({ children, wrapperId = "portal-wrapper" }: PortalProps) {
  const [wrapperElement, setwrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    // hook for creating layout, it works before the browser drew everything
    let element = document.getElementById(wrapperId);
    let created = false;

    if (!element) {
      created = true; // flag if element was created and we didnt find it before
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setwrapperElement(element);

    return () => {
      // removing element every time if it was created by us
      if (created) {
        element?.remove();
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default Portal;
