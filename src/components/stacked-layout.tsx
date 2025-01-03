'use client'

import * as Headless from '@headlessui/react'
import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { NavbarItem } from './navbar'

function OpenMenuIcon() {
  return (
    <span className='material-symbols-sharp'>menu</span>
  )
}

function CloseMenuIcon() {
  return (
    <span className='material-symbols-sharp'>close</span>
  )
}

function MobileSidebar({ open, close, children }: React.PropsWithChildren<{ open: boolean; close: () => void }>) {
  return (
    <Headless.Dialog open={open} onClose={close} className="lg:hidden">
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <Headless.DialogPanel
        transition
        className="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
      >
        <div className="flex h-full flex-col rounded-lg bg-white shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="-mb-3 px-4 pt-3">
            <Headless.CloseButton as={NavbarItem} aria-label="Close navigation">
              <CloseMenuIcon />
            </Headless.CloseButton>
          </div>
          {children}
        </div>
      </Headless.DialogPanel>
    </Headless.Dialog>
  )
}

export function StackedLayout({
  navbar,
  sidebar,
  children,
}: React.PropsWithChildren<{ navbar: React.ReactNode; sidebar: React.ReactNode }>) {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="relative isolate flex min-h-svh w-full flex-col bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      {/* Sidebar on mobile */}
      <MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
        {sidebar}
      </MobileSidebar>

      {/* Navbar */}
      <header className="flex items-center px-3 md:px-4">
        <div className="py-2.5 lg:hidden">
          <NavbarItem onClick={() => setShowSidebar(true)} aria-label="Open navigation">
            <OpenMenuIcon />
          </NavbarItem>
        </div>
        <div className="min-w-0 flex-1">{navbar}</div>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col pb-2 lg:px-2">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-3xl">
            {children}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
