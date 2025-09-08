import {
  HouseIcon,
  PlusIcon,
  SparklesIcon,
  LayoutDashboard,
  Newspaper
} from "lucide-react";

import Logo from "@/components/logo";
import UserMenu from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Navigation links array
export default function Navbar({registerd,admin}) {


  const navigationLinks = [
    { href: "/", label: "Home", icon: HouseIcon, active: true },
    { href: "/posts", label: "Posts", icon: Newspaper },
    admin
      ? { href: "/admin-dashboard", label: "Admin Dashboard", icon: LayoutDashboard }
      : null,
  ].filter(Boolean);
  return (
    <header className="border-b px-4 md:px-6 ">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="flex-row items-center gap-2 py-1.5"
                          active={link.active}
                        >
                          <Icon
                            size={16}
                            className="text-muted-foreground/80"
                            aria-hidden="true"
                          />
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                  {!registerd && (
                    <>
                      <NavigationMenuItem className="w-full">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-sm w-full"
                        >
                          <a href="#">Sign In</a>
                        </Button>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-sm w-full bg-black text-white hover:bg-black hover:text-white"
                        >
                          <a href="#">Get Started</a>
                        </Button>
                      </NavigationMenuItem>
                    </>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      active={link.active}
                      href={link.href}
                      className="text-foreground hover:text-primary flex-row items-center gap-2 py-1.5 font-medium"
                    >
                      <Icon
                        size={16}
                        className="text-muted-foreground/80"
                        aria-hidden="true"
                      />
                      <span>{link.label}</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Logo */}

          <div className="flex items-center md:hidden">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
          </div>
        </div>

        {/* Middle side: Logo */}
        <div className="hidden items-center md:flex">
          <a href="#" className="text-primary hover:text-primary/90">
            <Logo />
          </a>
        </div>

        {/* Right side: Actions */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {/* User menu */}

          {registerd ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-sm hidden md:flex"
              >
                <a href="#">Sign In</a>
              </Button>
              <Button asChild size="sm" className="text-sm hidden md:flex">
                <a href="#">Get Started</a>
              </Button>
            </div>
          )}

          {/* Create Post button */}
          {registerd && (
            <Button
              size="sm"
              className="text-sm max-sm:aspect-square max-sm:p-0 bg-gray-100 text-black cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all"
            >
              <PlusIcon
                className="opacity-60 sm:-ms-1"
                size={16}
                aria-hidden="true"
              />
              <span className="max-sm:sr-only">Post</span>
            </Button>
          )}

          {/* Upgrade button */}
          <Button size="sm" className="text-sm sm:aspect-square cursor-pointer">
            <SparklesIcon
              className="opacity-60 sm:-ms-1"
              size={16}
              aria-hidden="true"
            />
            <span className="sm:sr-only">Upgrade</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
