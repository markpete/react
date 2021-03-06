import * as React from 'react'
import * as _ from 'lodash'
import { UIComponent } from 'src/lib'
import { Extendable } from 'types/utils'
import { ICSSInJSStyle } from 'types/theme'
import { getTestingRenderedComponent } from 'test/utils'

type AttrValue = 'props' | 'state'

interface IProps {
  propsAttr?: AttrValue
  commonAttr?: AttrValue
}

interface IState {
  commonAttr?: AttrValue
  stateAttr?: AttrValue
}

type IPropsAndState = IProps & IState

const testClassName = 'ui-test-component'

const testStylesForComponent = ({
  props,
  state,
  expected,
}: { props?: IProps; state?: IState; expected?: IPropsAndState } = {}) => {
  class TestComponent extends UIComponent<Extendable<IProps>, IState> {
    public static className = testClassName
    public static handledProps = ['propsAttr', 'commonAttr', 'styles']

    public state = state

    public renderComponent({ ElementType, classes, rest }): React.ReactNode {
      return <ElementType {...rest} className={classes.root} />
    }
  }

  const TestStylesComponent = (props: Extendable<IProps>) => (
    <TestComponent
      {...props}
      styles={{
        root: ({ props }: { props: IPropsAndState }): ICSSInJSStyle => {
          expect(_.mapValues(expected, (val, key) => props[key])).toEqual(expected)
          return {}
        },
      }}
    />
  )

  getTestingRenderedComponent(TestStylesComponent, <TestStylesComponent {...props} />)
}

describe('styles function', () => {
  it('receives as argument only props object if state is not set', () => {
    testStylesForComponent({ expected: {} })

    testStylesForComponent({
      props: { propsAttr: 'props' },
      expected: { propsAttr: 'props' },
    })

    testStylesForComponent({
      props: { propsAttr: 'props', commonAttr: 'props' },
      expected: { propsAttr: 'props', commonAttr: 'props' },
    })
  })

  it('receives as argument a simple merge of props and state objects if both are set but there are no overlapping properties', () => {
    testStylesForComponent({
      props: { propsAttr: 'props' },
      state: { stateAttr: 'state' },
      expected: { propsAttr: 'props', stateAttr: 'state' },
    })

    testStylesForComponent({
      props: { propsAttr: 'props' },
      state: { commonAttr: 'state', stateAttr: 'state' },
      expected: { propsAttr: 'props', commonAttr: 'state', stateAttr: 'state' },
    })

    testStylesForComponent({
      props: { propsAttr: 'props', commonAttr: 'props' },
      state: { stateAttr: 'state' },
      expected: { propsAttr: 'props', commonAttr: 'props', stateAttr: 'state' },
    })
  })

  it('receives as argument a merge of props and state objects where props have priority over state when we have overlapping properties', () => {
    testStylesForComponent({
      props: { commonAttr: 'props' },
      state: { commonAttr: 'state' },
      expected: { commonAttr: 'props' },
    })

    testStylesForComponent({
      props: { propsAttr: 'props', commonAttr: 'props' },
      state: { commonAttr: 'state' },
      expected: { propsAttr: 'props', commonAttr: 'props' },
    })

    testStylesForComponent({
      props: { commonAttr: 'props' },
      state: { commonAttr: 'state', stateAttr: 'state' },
      expected: { commonAttr: 'props', stateAttr: 'state' },
    })

    testStylesForComponent({
      props: { propsAttr: 'props', commonAttr: 'props' },
      state: { commonAttr: 'state', stateAttr: 'state' },
      expected: { propsAttr: 'props', commonAttr: 'props', stateAttr: 'state' },
    })
  })
})
