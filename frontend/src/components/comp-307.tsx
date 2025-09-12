import { useState } from "react";
import { Eclipse, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="dark bg-muted text-foreground px-4 py-3 md:py-2">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <Eclipse
            className="shrink-0 opacity-60 max-md:mt-0.5"
            size={16}
            aria-hidden="true"
          />
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <p className="text-sm">
              🚀 Welcome! Sign up now to start exploring our blog and join the
              community.
            </p>
            <div className="flex gap-2 max-md:flex-wrap">
              <Link to={"/register"}>
              <Button size="sm" className="text-sm">
                Get Started
              </Button>
              </Link>
                <Link to={"/login"}>
              <Button variant="link" size="sm" className="text-sm">
                Sign In
              </Button>
                </Link>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}
