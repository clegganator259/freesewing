import { NavigationContext } from 'shared/context/navigation-context.mjs'
import { useContext } from 'react'
import Link from 'next/link'
import orderBy from 'lodash.orderby'
import {
  CommunityIcon,
  DesignIcon,
  DocsIcon,
  HelpIcon,
  RssIcon,
  ShowcaseIcon,
  UserIcon,
  MeasureIcon,
  PageIcon,
  TrophyIcon,
  CodeIcon,
  I18nIcon,
  WrenchIcon,
  FreeSewingIcon,
  HeartIcon,
} from 'shared/components/icons.mjs'
import { Breadcrumbs } from 'shared/components/breadcrumbs.mjs'

export const ns = ['sections']

// List of icons matched to top-level slug
export const icons = {
  // FreeSewing.dev
  api: (className = '') => <DocsIcon className={className} />,
  design: (className = '') => <DesignIcon className={className} />,
  contribute: (className = '') => <CodeIcon className={className} />,
  i18n: (className = '') => <I18nIcon className={className} />,
  infra: (className = '') => <WrenchIcon className={className} stroke={1.5} />,
  about: (className = '') => <FreeSewingIcon className={className} stroke={1.5} />,
  support: (className = '') => <HeartIcon className={className} stroke={1.5} fill />,

  // FreeSewing.org
  account: (className = '') => <UserIcon className={className} />,
  blog: (className = '') => <RssIcon className={className} stroke={3} />,
  designs: (className = '') => <DesignIcon className={className} stroke={3} />,
  docs: (className = '') => <DocsIcon className={className} />,
  showcase: (className = '') => <ShowcaseIcon className={className} />,
  community: (className = '') => <CommunityIcon className={className} />,
  sets: (className = '') => <MeasureIcon className={className} />,
  patterns: (className = '') => <PageIcon className={className} />,
  training: (className = '') => <TrophyIcon className={className} />,
}

/* helper method to order nav entries */
const order = (obj) => orderBy(obj, ['o', 't'], ['asc', 'asc'])

// Component for the collapse toggle
// Exported for re-use
export const Chevron = ({ w = 8, m = 2 }) => (
  <svg
    className={`
    fill-current opacity-75 w-${w} h-${w} mr-${m}
    details-toggle hover:text-secondary sm:hover:text-secondary
  `}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
  </svg>
)

// Helper method to filter out the real children
const currentChildren = (current) =>
  Object.values(order(current)).filter((entry) => typeof entry === 'object')

// Shared classes for links
// Exported for re-use
export const linkClasses = `
  py-1
  text-base text-base-content sm:text-base-content
  hover:text-secondary
  sm:hover:text-secondary
`

// Figure out whether a page is on the path to the active page
export const isActive = (slug, active) => {
  if (!slug) return false
  if (slug === active) return true
  let result = true
  const slugParts = slug.split('/')
  const activeParts = active.split('/')
  for (const i in slugParts) {
    if (slugParts[i] !== activeParts[i]) result = false
  }

  return result
}

// Component that renders a sublevel of navigation
const SubLevel = ({ nodes = {}, active = '' }) => (
  <ul className="pl-5 list-inside">
    {currentChildren(nodes).map((child) =>
      Object.keys(child).length > 4 ? (
        <li key={child.s} className="flex flex-row">
          <details className="grow" open={isActive(child.s, active)}>
            <summary
              className={`
              flex flex-row
              px-2
              text-base-content
              sm:text-base-content
              hover:cursor-row-resize
              items-center
            `}
            >
              <Link
                href={`/${child.s}`}
                title={child.t}
                className={`
                grow pl-2 border-l-2
                ${linkClasses}
                hover:cursor-pointer
                hover:border-secondary
                sm:hover:border-secondary
                ${
                  child.s === active
                    ? 'text-secondary border-secondary sm:text-secondary sm:border-secondary'
                    : 'text-base-content sm:text-base-content'
                }
              `}
              >
                <span className={`${linkClasses} grow hover:cursor-pointer`}>
                  <span
                    className={`
                    text-3xl mr-2 inline-block p-0 leading-3
                    ${
                      child.s === active
                        ? 'text-secondary sm:text-secondary translate-y-1'
                        : 'translate-y-3'
                    }
                  `}
                  >
                    {child.s === active ? <>&bull;</> : <>&deg;</>}
                  </span>
                  <span className={child.s === active ? 'font-bold' : ''}>{child.t}</span>
                </span>
              </Link>
              <Chevron w={6} m={3} />
            </summary>
            <SubLevel nodes={child} active={active} />
          </details>
        </li>
      ) : (
        <li className="pl-2 flex flex-row items-center" key={child.s}>
          <Link
            href={`/${child.s}`}
            title={child.t}
            className={`
            pl-2 border-l-2
            grow
            ${linkClasses}
            hover:cursor-pointer
            hover:border-secondary
            sm:hover:border-secondary
            ${
              child.s === active
                ? 'text-secondary border-secondary sm:text-secondary sm:border-secondary'
                : 'text-base-content sm:text-base-content'
            }`}
          >
            <span className={`${linkClasses} hover:cursor-pointer`}>
              <span
                className={`
                text-3xl mr-2 inline-block p-0 leading-3
                ${
                  child.s === active
                    ? 'text-secondary sm:text-secondary translate-y-1'
                    : 'translate-y-3'
                }
              `}
              >
                {child.s === active ? <>&bull;</> : <>&deg;</>}
              </span>
              <span className={child.s === active ? 'font-bold' : ''}>{child.t}</span>
            </span>
          </Link>
        </li>
      )
    )}
  </ul>
)

export const Icons = ({
  ulClasses = '',
  linkClasses = `grow text-lg lg:text-xl py-1 text-base-content sm:text-base-content
  hover:text-secondary sm:hover:text-secondary hover:cursor-pointer
  flex flex-col items-center`,
  linkStyle = {},
}) => {
  const { nav } = useContext(NavigationContext)
  if (!nav) return null

  const output = []
  for (const page of order(nav)) {
    output.push(
      <li key={page.s}>
        <Link href={`/${page.s}`} className={linkClasses} title={page.t} style={linkStyle}>
          {icons[page.s] ? icons[page.s]('w-14 h-14') : <HelpIcon />}
          <span className="font-bold">{page.t}</span>
        </Link>
      </li>
    )
  }

  return <ul className={ulClasses}>{output}</ul>
}

export const MainSections = () => {
  const { sections = false, slug } = useContext(NavigationContext)
  if (!sections) return null
  // Ensure each page as an `o` key so we can put them in order
  const sortableSections = sections.map((s) => ({ ...s, o: s.o ? s.o : s.t }))
  const output = []
  for (const page of orderBy(sortableSections, ['o', 't'])) {
    const act = isActive(page.s, slug)
    const txt = (
      <>
        {icons[page.s] ? (
          icons[page.s](`w-6 h-6 ${act ? 'text-secondary-content' : ''}`)
        ) : (
          <HelpIcon />
        )}
        <span className={`font-bold ${act ? 'text-secondary-content' : ''}`}>{page.t}</span>
      </>
    )

    const item = (
      <li key={page.s}>
        {act ? (
          <span
            className={`
                flex flex-row gap-4 items-center
                text-secondary-content
                hover:text-base-content
                bg-secondary
                p-2 px-4 rounded
                bg-base-200
                rounded-none
              `}
            title={page.t}
          >
            {txt}
          </span>
        ) : (
          <Link
            href={`/${page.s}`}
            className={`
              flex flex-row gap-4 items-center
              hover:bg-secondary hover:bg-opacity-25 hover:cursor-pointer
              p-2 px-4 rounded
              rounded-none
            `}
            title={page.t}
          >
            {txt}
          </Link>
        )}
      </li>
    )
    output.push(item)
  }

  return <ul>{output}</ul>
}

const getCrumb = (index, crumbs) => crumbs[index].s.split('/').pop()

export const ActiveSection = () => {
  // Get navigation context
  const { crumbs = [], nav = {}, slug } = useContext(NavigationContext)

  // Don't bother if we don't know where we are
  if (!crumbs || !Array.isArray(crumbs) || crumbs.length < 1) return null

  let slice = 1
  let nodes = nav
  // Some sections are further trimmed
  if (crumbs[0].s === 'docs') {
    if (crumbs.length > 1 && crumbs[1].s === 'docs/faq') {
      slice = 2
      nodes = nav[getCrumb(1, crumbs)]
    } else if (crumbs.length === 2) {
      slice = 2
      nodes = nav[getCrumb(1, crumbs)]
    } else if (
      crumbs.length === 4 &&
      crumbs[1].s === 'docs/patterns' &&
      crumbs[3].s.split('/').pop() === 'options'
    ) {
      slice = 4
      nodes = nav[getCrumb(1, crumbs)][getCrumb(2, crumbs)][getCrumb(3, crumbs)]
    } else if (crumbs.length > 2 && crumbs[1].s === 'docs/patterns') {
      slice = 3
      nodes = nav[getCrumb(1, crumbs)][getCrumb(2, crumbs)]
    }
  }

  return (
    <div>
      <div className="pl-4 my-2">
        <Breadcrumbs crumbs={crumbs.slice(0, slice)} />
      </div>
      <div className="pr-2">
        <SubLevel hasChildren={1} nodes={nodes} active={slug} />
      </div>
    </div>
  )
}
