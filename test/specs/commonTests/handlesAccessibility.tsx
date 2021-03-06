import * as React from 'react'

import { getTestingRenderedComponent } from 'test/utils'
import { ButtonBehavior, DefaultBehavior } from 'src/lib/accessibility'

export const getRenderedAttribute = (renderedComponent, propName, partSelector) => {
  const target = partSelector
    ? renderedComponent.render().find(partSelector)
    : renderedComponent.render()

  return target.first().prop(propName)
}

/**
 * Assert Component handles accessibility attributes correctly.
 * @param {React.Component|Function} Component A component that should conform.
 * @param {Object} [options={}]
 * @param {Object} [options.requiredProps={}] Props required to render Component without errors or warnings.
 * @param {string} [options.defaultRootRole=''] Default root role rendered when no override provided
 * @param {string} [options.accessibilityOverride=ButtonBehavior] Override to test accessibility property override
 * @param {string} [options.overriddenRootRole=ButtonBehavior] Overridden root role when accessibility property overridden
 * @param {string} [options.partSelector=''] Selector to scope the test to a part
 */
export default (Component, options: any = {}) => {
  const {
    requiredProps = {},
    defaultRootRole = undefined,
    accessibilityOverride = ButtonBehavior,
    overriddenRootRole = 'button',
    partSelector = '',
  } = options

  test('gets default accessibility when no override used', () => {
    const rendered = getTestingRenderedComponent(Component, <Component {...requiredProps} />)
    const role = getRenderedAttribute(rendered, 'role', partSelector)
    expect(role).toBe(defaultRootRole)
  })

  test('does not get role when overrides to default', () => {
    const rendered = getTestingRenderedComponent(
      Component,
      <Component {...requiredProps} accessibility={DefaultBehavior} />,
    )
    const role = getRenderedAttribute(rendered, 'role', partSelector)
    expect(role).toBeFalsy()
  })

  if (!partSelector) {
    // temporarily disabled as we do not support overriding of attributes applied to parts
    test('gets correct role when overrides accessibility', () => {
      const rendered = getTestingRenderedComponent(
        Component,
        <Component {...requiredProps} accessibility={accessibilityOverride} />,
      )
      const role = getRenderedAttribute(rendered, 'role', partSelector)
      expect(role).toBe(overriddenRootRole)
    })

    test('gets correct role when overrides role', () => {
      const testRole = 'test-role'
      const rendered = getTestingRenderedComponent(
        Component,
        <Component {...requiredProps} role={testRole} />,
      )
      const role = getRenderedAttribute(rendered, 'role', partSelector)
      expect(role).toBe(testRole)
    })

    test('gets correct role when overrides both accessibility and role', () => {
      const testRole = 'test-role'
      const rendered = getTestingRenderedComponent(
        Component,
        <Component {...requiredProps} accessibility={accessibilityOverride} role={testRole} />,
      )
      const role = getRenderedAttribute(rendered, 'role', partSelector)
      expect(role).toBe(testRole)
    })
  }
}
