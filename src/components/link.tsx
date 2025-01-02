import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { NavLink } from "react-router";

export const Link = forwardRef(function Link(
  props: { href: string } & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  const { href, ...rest } = props

  return (
    <Headless.DataInteractive>
      <NavLink to={href} {...rest} ref={ref} />
    </Headless.DataInteractive>
  )
})
