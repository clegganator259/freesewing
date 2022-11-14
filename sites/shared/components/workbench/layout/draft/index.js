import { useRef } from 'react'
import Stack from './part'
import SvgWrapper from '../../draft/svg-wrapper'
import { PartInner } from '../../draft/part'

const Draft = (props) => {
  const {
    draft,
    patternProps,
    gist,
    updateGist,
    app,
    bgProps = {},
    fitLayoutPart = false,
    layoutType = 'printingLayout',
  } = props

  const svgRef = useRef(null)
  if (!patternProps) return null
  // keep a fresh copy of the layout because we might manipulate it without saving to the gist
  let layout = draft.settings[0].layouts?.printingLayout || {
    ...patternProps.autoLayout,
    width: patternProps.width,
    height: patternProps.height,
  }

  // Helper method to update part layout and re-calculate width * height
  const updateLayout = (name, config, history = true) => {
    // Start creating new layout
    const newLayout = { ...layout }
    newLayout.stacks[name] = config

    // Pattern topLeft and bottomRight
    let topLeft = { x: 0, y: 0 }
    let bottomRight = { x: 0, y: 0 }
    for (const [pname, part] of Object.entries(patternProps.stacks)) {
      if (pname == props.layoutPart && !fitLayoutPart) continue
      let partLayout = newLayout.stacks[pname]

      // Pages part does not have its topLeft and bottomRight set by core since it's added post-draft
      if (partLayout?.tl) {
        // set the pattern extremes
        topLeft.x = Math.min(topLeft.x, partLayout.tl.x)
        topLeft.y = Math.min(topLeft.y, partLayout.tl.y)
        bottomRight.x = Math.max(bottomRight.x, partLayout.br.x)
        bottomRight.y = Math.max(bottomRight.y, partLayout.br.y)
      }
    }

    newLayout.width = bottomRight.x - topLeft.x
    newLayout.height = bottomRight.y - topLeft.y
    newLayout.bottomRight = bottomRight
    newLayout.topLeft = topLeft

    if (history) {
      updateGist(['layouts', layoutType], newLayout, history)
    } else {
      // we don't put it in the gist if it shouldn't contribute to history because we need some of the data calculated here for rendering purposes on the initial layout, but we don't want to actually save a layout until the user manipulates it. This is what allows the layout to respond appropriately to settings changes. Once the user has starting playing with the layout, all bets are off
      layout = newLayout
    }
  }

  // We need to make sure the `pages` part is at the bottom of the pile
  // so we can drag-drop all parts on top of it.
  // Bottom in SVG means we need to draw it first
  const viewBox = layout.topLeft
    ? `${layout.topLeft.x} ${layout.topLeft.y} ${layout.width} ${layout.height}`
    : false

  const stacks = [
    <PartInner
      {...{ part: patternProps.parts[0][props.layoutPart], partName: props.layoutPart, gist }}
      key={props.layoutPart}
    />,
  ]
  for (var stackName in patternProps.stacks) {
    if (stackName === props.layoutPart) {
      continue
    }
    let stack = patternProps.stacks[stackName]

    const stackPart = (
      <Stack
        {...{
          key: stackName,
          stackName,
          stack,
          layout,
          app,
          gist,
          updateLayout,
          isLayoutPart: stackName === props.layoutPart,
        }}
      />
    )

    stacks.push(stackPart)
  }

  return (
    <SvgWrapper {...{ patternProps, gist, viewBox }} ref={svgRef}>
      <rect x="0" y="0" width={layout.width} height={layout.height} {...bgProps} />
      {stacks}
    </SvgWrapper>
  )
}

export default Draft
