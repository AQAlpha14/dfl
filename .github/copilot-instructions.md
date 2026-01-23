# Copilot Instructions for DirectlyFromLandlords Codebase

## Project Overview
**DirectlyFromLandlords** is a Next.js 16 real estate platform with internationalization (EN/AR), featuring property listings, forms, and vendor management. The app uses App Router with `[locale]` dynamic routing for multi-language support.

## Architecture & Key Patterns

### Directory Structure
- **`app/`** - Next.js App Router with `[locale]` parameter for i18n routing
- **`components/`** - Reusable UI components; form inputs use React Hook Form patterns
- **`actions/`** - Server-side actions marked with `"use server"` for auth, API calls
- **`stores/`** - Zustand stores for client-side state (filters, vendor data, properties)
- **`context/`** - React Context: `LanguageContext` (EN/AR), `DrawerProvider` (mobile nav)
- **`utils/`** - Helpers: `apiHelper` (error handling, currency conversion), `textToRouteUrl`
- **`constants/`** - Types, endpoints, config flags (`isIndex`, `nocache`, `vendorId`)

### Form Architecture
- **Framework**: React Hook Form with `@hookform/resolvers`
- **Pattern**: Components use `useFormContext()` and `Controller` for integration
- **Examples**: `RHFTextField`, `PhoneNumberInput`, `RHFSelect`
- **Key**: All form fields connect via React Hook Form's `<Controller>`, not direct onChange handlers
- **Validation**: Handled through resolvers and form context state

### State Management
- **Zustand** (`@5.0.10`) with persist middleware for client-side stores
- **Location**: `stores/` directory with typed state
- **Example**: `filterStore.tsx` manages search filters with `setFilter`, `setMultipleFilters`, `resetFilters`
- **Pattern**: Use `create<StoreType>()` with typed actions and persist middleware

### Server Actions
- All functions in `actions/` are marked `"use server"`
- Handle auth, cookie management, API calls to backend
- Return typed `ApiResponse<T>` objects with status, message, data fields
- Error responses may have `detail` (API error) or `message` fields

### API Integration
- **Helper**: `utils/apiHelper.tsx` provides `handleResponse()` for errors, `ConvertToCurrency()` for AED formatting
- **Logout**: `handleResponse()` auto-logs out on auth errors via `LOG_OUT()` action
- **Endpoints**: Defined in `constants/endPionts.tsx` (note: "Pione**t**s" typo in filename)
- **Image CDN**: Remote patterns configured for `carsolution.hatchtechs.ae`

### Localization Pattern
- URL-based: `[locale]` param in routes, locale values are `"en"` | `"ar"`
- **Context Hook**: Use `const { locale, setLocale } = useLanguage()` from `LanguageContext`
- **DOM Effect**: Context automatically sets `document.documentElement.lang` and `dir` (RTL for Arabic)
- **Components**: Use locale param from `useParams<{ locale?: Locale }>()` when needed

### Styling
- **Tailwind CSS** v4.1 with custom fonts (Creato Display custom font, Archivo from Google Fonts)
- **Motion**: Framer Motion (`^12.26.2`) and GSAP (`^3.14.2`) for animations
- **Icon Library**: Iconify React with SVG icons in `public/icons/SVGIcons.tsx`
- **Carousel**: Splide.js with extensions (auto-scroll, grid)

## Developer Workflows

### Build & Run
```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build (standalone output mode)
npm start          # Run production build
npm run lint       # Run ESLint (eslint.config.mjs)
```

### Key Build Config (`next.config.ts`)
- `output: "standalone"` - Containerized deployment ready
- `reactStrictMode: false` - Disabled (handle carefully in new code)
- `skipProxyUrlNormalize: true` - For proxy setup (see `proxy.js`)
- Static image caching: 9999999999s TTL, `unoptimized: true`

## Critical Conventions & Patterns

### TypeScript & Strict Mode
- **Enabled**: `"strict": true` in `tsconfig.json`
- **Path Alias**: `@/*` resolves to workspace root
- **React 19**: Use latest React patterns (no legacy string refs)

### Form Field Components
- **Always use** `RHFTextField`, `PhoneNumberInput`, etc. (avoid uncontrolled inputs)
- **Controller pattern**: Wrap in `Controller` with `name` and `useFormContext()` hook
- **Props convention**: `name`, `title` (label), `placeholder`, `className`, `inputClass`, `isHidden`
- **Example usage**:
```tsx
<RHFTextField name="email" title="Email" placeholder="Enter email" />
```

### Component File Extensions
- **`.tsx`** - React components with TypeScript
- **`.jsx`** - JavaScript components (legacy, being phased out)
- **`.ts`** - Utilities and types
- **Preference**: Use `.tsx` for new components

### Naming Conventions
- **Components**: PascalCase (e.g., `RHFTextField`, `BillingForm`)
- **Hooks**: camelCase prefixed with `use` (e.g., `useLanguage`)
- **Stores**: camelCase suffixed with `Store` (e.g., `filterStore`)
- **Actions**: camelCase prefixed with verb (e.g., `createCookie`, `LOG_OUT`)

### Error Handling
- Use `handleResponse()` from `apiHelper` for API errors → auto-logout + toast
- Sonner toast for user feedback: `toast.error()`, `toast.success()`
- Server actions should return typed responses, not throw

## Integration Points & Dependencies

### External Services
- **Backend API**: `carsolution.hatchtechs.ae` (image CDN, API endpoints in constants)
- **Form Libraries**: React Hook Form, React Select, React Phone Input
- **Notifications**: Sonner (toast library)
- **Animations**: Framer Motion, GSAP, Splide carousel

### Context Providers
Order in `app/provider.js`:
1. `LanguageProvider` (outermost - needed for locale-aware components)
2. `DrawerProvider` (mobile navigation)
3. `Sonner` toaster (notifications)

### Critical Directories to Reference
- **Form examples**: `components/AllForms/` (BookingForm, ContactForm, SignupForm patterns)
- **Modal patterns**: `components/Modal/` (CommonModal, InquiryFormModal)
- **Store examples**: `stores/filterStore.tsx` (Zustand + persist pattern)
- **Server action patterns**: `actions/actions.tsx` (async/await, cookie handling, ApiResponse types)

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Form field not updating | Ensure wrapped in `FormProvider`, using `Controller`, and `useFormContext()` |
| Locale not switching | Check `LanguageContext` provider in layout, confirm route has `[locale]` param |
| Image not loading | Verify hostname in `next.config.ts` remotePatterns; check for unoptimized: true |
| API auth error | Error handling in `handleResponse()` auto-logs out; check endpoint in constants |
| Build fails on strict mode | Review `tsconfig.json` strict options; may need to fix null checks |

## New Feature Checklist
- [ ] Add server action to `actions/` if API call needed
- [ ] Use Zustand store in `stores/` for client-side state
- [ ] Wrap forms with `FormProvider` from React Hook Form
- [ ] Add types to `constants/type.tsx` for new props
- [ ] Test multi-language in both EN and AR modes (check RTL)
- [ ] Add lint check: `npm run lint`
