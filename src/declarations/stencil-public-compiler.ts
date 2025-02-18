import { JsonDocs } from './stencil-public-docs';
export * from './stencil-public-docs';

/**
 * https://stenciljs.com/docs/config/
 */
export interface StencilConfig {
  /**
   * By default, Stencil will attempt to optimize small scripts by inlining them in HTML. Setting
   * this flag to `false` will prevent this optimization and keep all scripts separate from HTML.
   */
  allowInlineScripts?: boolean;
  /**
   * By default, Stencil will use the appropriate config to automatically prefix css. For example,
   * developers can write modern and standard css properties, such as "transform", and Stencil
   * will automatically add in the prefixed version, such as "-webkit-transform". To disable
   * autoprefixing css, set this value to `false`.
   */
  autoprefixCss?: boolean | any;

  /**
   * By default, Stencil will statically analyze the application and generate a component graph of
   * how all the components are interconnected.
   *
   * From the component graph it is able to best decide how components should be grouped
   * depending on their usage with one another within the app.
   * By doing so it's able to bundle components together in order to reduce network requests.
   * However, bundles can be manually generated using the bundles config.
   *
   * The bundles config is an array of objects that represent how components are grouped together
   * in lazy-loaded bundles.
   * This config is rarely needed as Stencil handles this automatically behind the scenes.
   */
  bundles?: ConfigBundle[];

  /**
   * The copy config is an array of objects that defines any files or folders that should
   * be copied over to the build directory.
   *
   * Each object in the array must include a src property which can be either an absolute path,
   * a relative path or a glob pattern. The config can also provide an optional dest property
   * which can be either an absolute path or a path relative to the build directory.
   * Also note that any files within src/assets are automatically copied to www/assets for convenience.
   *
   * In the copy config below, it will copy the entire directory from src/docs-content over to www/docs-content.
   *
   * @deprecated
   */
  copy?: CopyTask[];

  /**
   * Stencil will cache build results in order to speed up rebuilds.
   * To disable this feature, set enableCache to false.
   */
  enableCache?: boolean;

  /**
   * The excludeSrc config setting specifies a set of regular expressions that should be excluded
   * from the build process.
   *
   * The defaults are meant to exclude possible test files that you would not want to include in your final build.
   *
   * @deprecated Use the "exclude" option in "tsconfig.json"
   */
  excludeSrc?: string[];

  /**
   * Stencil is traditionally used to compile many components into an app,
   * and each component comes with its own compartmentalized styles.
   * However, it's still common to have styles which should be "global" across all components and the website.
   * A global CSS file is often useful to set CSS Variables.
   *
   * Additonally, the globalStyle config is can be used to precompile styles with Sass, PostCss, etc.
   * Below is an example folder structure containing a webapp's global sass file, named app.css.
   */
  globalStyle?: string;

  /**
   * When the hashFileNames config is set to true, and it is a production build,
   * the hashedFileNameLength config is used to determine how many characters the file name's hash should be.
   */
  hashedFileNameLength?: number;

  /**
   * During production builds, the content of each generated file is hashed to represent the content,
   * and the hashed value is used as the filename. If the content isn't updated between builds,
   * then it receives the same filename. When the content is updated, then the filename is different.
   *
   * By doing this, deployed apps can "forever-cache" the build directory and take full advantage of
   * content delivery networks (CDNs) and heavily caching files for faster apps.
   */
  hashFileNames?: boolean;

  /**
   * The namespace config is a string representing a namespace for the app.
   * For apps that are not meant to be a library of reusable components,
   * the default of App is just fine. However, if the app is meant to be consumed
   * as a third-party library, such as Ionic, a unique namespace is required.
   */
  namespace?: string;

  /**
   * Stencil is able to take an app's source and compile it to numerous targets,
   * such as an app to be deployed on an http server, or as a third-party library
   * to be distributed on npm. By default, Stencil apps have an output target type of www.
   *
   * The outputTargets config is an array of objects, with types of www and dist.
   */
  outputTargets?: OutputTarget[];

  /**
   * The plugins config can be used to add your own rollup plugins.
   * By default, Stencil does not come with Sass or PostCss support.
   * However, either can be added using the plugin array.
   */
  plugins?: any[];

  /**
   * The srcDir config specifies the directory which should contain the source typescript files
   * for each component. The standard for Stencil apps is to use src, which is the default.
   */
  srcDir?: string;

  /**
   * Passes custom configuration down to the "@rollup/plugin-commonjs" that Stencil uses under the hood.
   * For further information: https://stenciljs.com/docs/module-bundling
   */
  commonjs?: BundlingConfig;

  /**
   * Passes custom configuration down to the "@rollup/plugin-node-resolve" that Stencil uses under the hood.
   * For further information: https://stenciljs.com/docs/module-bundling
   */
  nodeResolve?: NodeResolveConfig;

  /**
   * Passes custom configuration down to rollup itself, not all rollup options can be overriden.
   */
  rollupConfig?: RollupConfig;

  /**
   * Sets if the ES5 build should be generated or not. It defaults to `false` in dev mode, and `true` in
   * production mode. Notice that Stencil always generates a modern build too, whereas this setting
   * will either disable es5 builds entirely with `false`, or always create es5 builds (even in dev mode)
   * when set to `true`. Basically if the app does not need to run on legacy browsers
   * (IE11 and Edge 18 and below), it's safe to set `buildEs5` to `false`, which will also speed up
   * production build times. In addition to not creating es5 builds, apps may also be interested in
   * disabling any unnecessary runtime when support legacy browsers. See
   * [https://stenciljs.com/docs/config-extras](/docs/config-extras) for more information.
   */
  buildEs5?: boolean;

  /**
   * Sets if the JS browser files are minified or not. Stencil uses `terser` under the hood.
   * Defaults to `false` in dev mode and `true` in production mode.
   */
  minifyJs?: boolean;

  /**
   * Sets if the CSS is minified or not.
   * Defaults to `false` in dev mode and `true` in production mode.
   */
  minifyCss?: boolean;

  /**
   * Forces Stencil to run in `dev` mode if the value is `true` and `production` mode
   * if it's `false`.
   *
   * Defaults to `false` (ie. production) unless the `--dev` flag is used in the CLI.
   */
  devMode?: boolean;

  /**
   * Object to provide a custom logger. By default a `logger` is already provided for the
   * platform the compiler is running on, such as NodeJS or a browser.
   */
  logger?: Logger;

  /**
   * Config to add extra runtime for DOM features that require more polyfills. Note
   * that not all DOM APIs are fully polyfilled when using the slot polyfill. These
   * are opt-in since not all users will require the additional runtime.
   */
  extras?: ConfigExtras;

  /**
   * The hydrated flag identifies if a component and all of its child components
   * have finished hydrating. This helps prevent any flash of unstyled content (FOUC)
   * as various components are asynchronously downloaded and rendered. By default it
   * will add the `hydrated` CSS class to the element. The `hydratedFlag` confg can be used
   * to change the name of the CSS class, change it to an attribute, or change which
   * type of CSS properties and values are assigned before and after hydrating. This config
   * can also be used to not include the hydrated flag at all by setting it to `null`.
   */
  hydratedFlag?: HydratedFlag;

  /**
   * Sets the task queue used by stencil's runtime. The task queue schedules DOM read and writes
   * across the frames to efficiently render and reduce layout thrashing. By default, the
   * `congestionAsync` is used. It's recommended to also try each setting to decide which works
   * best for your use-case. In all cases, if your app has many CPU intensive tasks causing the
   * main thread to periodically lock-up, it's always recommended to try
   * [Web Workers](https://stenciljs.com/docs/web-workers) for those tasks.
   *
   * - `congestionAsync`: DOM reads and writes are scheduled in the next frame to prevent layout
   *   thrashing. When the app is heavily tasked and the queue becomes congested it will then
   *   split the work across multiple frames to prevent blocking the main thread. However, it can
   *   also introduce unnecesary reflows in some cases, especially during startup. `congestionAsync`
   *   is ideal for apps running animations while also simultaniously executing intesive tasks
   *   which may lock-up the main thread.
   *
   * - `async`: DOM read and writes are scheduled in the next frame to prevent layout thrashing.
   *   During intensive CPU tasks it will not reschedule rendering to happen in the next frame.
   *   `async` is ideal for most apps, and if the app has many intensive tasks causing the main
   *   thread to lock-up, it's recommended to try [Web Workers](https://stenciljs.com/docs/web-workers)
   *   rather than the congestion async queue.
   *
   * - `immediate`: Makes writeTask() and readTask() callbacks to be executed syncronously. Tasks
   *   are not scheduled to run in the next frame, but do note there is at least one microtask.
   *   The `immediate` setting is ideal for apps that do not provide long running and smooth
   *   animations. Like the async setting, if the app has intensive tasks causing the main thread
   *   to lock-up, it's recommended to try [Web Workers](https://stenciljs.com/docs/web-workers).
   */
  taskQueue?: 'async' | 'immediate' | 'congestionAsync';

  globalScript?: string;
  srcIndexHtml?: string;
  watch?: boolean;
  testing?: TestingConfig;
  maxConcurrentWorkers?: number;
  preamble?: string;
  /**
   * @deprecated Use the "include" option in "tsconfig.json"
   */
  includeSrc?: string[];
  rollupPlugins?: { before?: any[]; after?: any[] };

  entryComponentsHint?: string[];
  buildDist?: boolean;
  buildLogFilePath?: string;
  cacheDir?: string;
  devInspector?: boolean;
  devServer?: StencilDevServerConfig;
  enableCacheStats?: boolean;
  sys?: CompilerSystem;
  tsconfig?: string;
  validateTypes?: boolean;
  watchIgnoredRegex?: RegExp;
  excludeUnusedDependencies?: boolean;
  typescriptPath?: string;
  stencilCoreResolvedId?: string;
}

export interface ConfigExtras {
  /**
   * By default, the slot polyfill does not update `appendChild()` so that it appends
   * new child nodes into the correct child slot like how shadow dom works. This is an opt-in
   * polyfill for those who need it. Defaults to `false`.
   */
  appendChildSlotFix?: boolean;

  /**
   * By default, the runtime does not polyfill `cloneNode()` when cloning a component
   * that uses the slot polyfill. This is an opt-in polyfill for those who need it.
   * Defaults to `false`.
   */
  cloneNodeFix?: boolean;

  /**
   * Include the CSS Custom Property polyfill/shim for legacy browsers. Defaults to `true`
   * for legacy builds only. ESM builds will not include the css vars shim.
   */
  cssVarsShim?: boolean;

  /**
   * Dynamic `import()` shim. This is only needed for Edge 18 and below, and Firefox 67
   * and below. If you do not need to support Edge 18 and below (Edge before it moved
   * to Chromium) then it's recommended to set `dynamicImportShim` to `false`.
   * Defaults to `true`.
   */
  dynamicImportShim?: boolean;

  /**
   * Dispatches component lifecycle events. Mainly used for testing. Defaults to `false`.
   */
  lifecycleDOMEvents?: boolean;

  /**
   * Safari 10 supports ES modules with `<script type="module">`, however, it did not implement
   * `<script nomodule>`. When set to `false`, the runtime will not patch support for Safari 10.
   * Defaults to `true`.
   */
  safari10?: boolean;

  /**
   * It is possible to assign data to the actual `<script>` element's `data-opts` property,
   * which then gets passed to Stencil's initial bootstrap. This feature is only required
   * for very special cases and rarely needed. When set to `false` it will not read
   * this data. Defaults to `true`.
   */
  scriptDataOpts?: boolean;

  /**
   * If enabled `true`, the runtime will check if the shadow dom shim is required. However,
   * if it's determined that shadow dom is already natively supported by the browser then
   * it does not request the shim. Setting to `false` will avoid all shadow dom tests.
   * If the app does not need to support IE11 or Edge 18 it's recommended to set `shadowDomShim` to
   * `false`. Defaults to `true`.
   */
  shadowDomShim?: boolean;

  /**
   * When a component is first attached to the DOM, wait a single tick before rendering.
   * This worksaround an angular issue, where it attaches the elements before settings their initial state,
   * leading to double renders and unnecesary event dispatchs.
   */
  initializeNextTick?: boolean;

  /**
   * For browsers that do not support shadow dom (IE11 and Edge 18 and below), slot is polyfilled
   * to simulate the same behavior. However, the host element's `childNodes` and `children`
   * getters are not patched to only show the child nodes and elements of the default slot.
   * Defaults to `false`.
   */
  slotChildNodesFix?: boolean;

  /**
   * Enables the tagNameTransform option of `defineCustomElements()`, so the component tagName can be customized at runtime.
   */
  tagNameTransform?: boolean;
}

export interface Config extends StencilConfig {
  buildAppCore?: boolean;
  buildDocs?: boolean;
  configPath?: string;
  writeLog?: boolean;
  devServer?: DevServerConfig;
  flags?: ConfigFlags;
  fsNamespace?: string;
  logLevel?: LogLevel;
  rootDir?: string;
  packageJsonFilePath?: string;
  sourceMap?: boolean;
  suppressLogs?: boolean;
  profile?: boolean;
  tsCompilerOptions?: any;
  _isValidated?: boolean;
  _isTesting?: boolean;
}

export interface HydratedFlag {
  /**
   * Defaults to `hydrated`.
   */
  name?: string;
  /**
   * Can be either `class` or `attribute`. Defaults to `class`.
   */
  selector?: 'class' | 'attribute';
  /**
   * Defaults to use CSS `visibility` property.
   */
  property?: string;
  /**
   * This is the CSS value to give all components before it has been hydrated.
   * Defaults to `hidden`.
   */
  initialValue?: string;
  /**
   * This is the CSS value to assign once a component has finished hydrating.
   * Defaults to `inherit`.
   */
  hydratedValue?: string;
}

export interface StencilDevServerConfig {
  /**
   * IP address used by the dev server. The default is `0.0.0.0`, which points to all IPv4 addresses on the local machine, such as `localhost`.
   */
  address?: string;
  /**
   * Base path to be used by the server. Defaults to the root pathname.
   */
  basePath?: string;
  /**
   * EXPERIMENTAL!
   * During development, node modules can be independently requested and bundled, making for
   * faster build times. This is only available using the Stencil Dev Server throughout
   * development. Production builds and builds with the `es5` flag will override
   * this setting to `false`. Default is `false`.
   */
  experimentalDevModules?: boolean;
  /**
   * If the dev server should respond with gzip compressed content. Defaults to `true`.
   */
  gzip?: boolean;
  /**
   * When set, the dev server will run via https using the SSL certificate and key you provide (use `fs` if you want to read them from files).
   */
  https?: Credentials;
  /**
   * The URL the dev server should first open to. Defaults to `/`.
   */
  initialLoadUrl?: string;
  /**
   * When `true`, every request to the server will be logged within the terminal. Defaults to `false`.
   */
  logRequests?: boolean;
  /**
   * By default, when dev server is started the local dev URL is opened in your default browser. However, to prevent this URL to be opened change this value to `false`. Defaults to `true`.
   */
  openBrowser?: boolean;
  /**
   * Sets the server's port. Defaults to `3333`.
   */
  port?: number;
  /**
   * When files are watched and updated, by default the dev server will use `hmr` (Hot Module Replacement) to update the page without a full page refresh. To have the page do a full refresh use `pageReload`. To disable any reloading, use `null`. Defaults to `hmr`.
   */
  reloadStrategy?: PageReloadStrategy;
  root?: string;
  websocket?: boolean;
}

export interface DevServerConfig extends StencilDevServerConfig {
  browserUrl?: string;
  contentTypes?: { [ext: string]: string };
  devServerDir?: string;
  editors?: DevServerEditor[];
  excludeHmr?: string[];
  historyApiFallback?: HistoryApiFallback;
  openBrowser?: boolean;
  protocol?: 'http' | 'https';
}

export interface HistoryApiFallback {
  index?: string;
  disableDotRule?: boolean;
}

export interface DevServerEditor {
  id: string;
  name?: string;
  supported?: boolean;
  priority?: number;
}

export interface ConfigFlags {
  task?: TaskCommand;
  args?: string[];
  knownArgs?: string[];
  unknownArgs?: string[];
  address?: string;
  build?: boolean;
  cache?: boolean;
  checkVersion?: boolean;
  ci?: boolean;
  compare?: boolean;
  config?: string;
  debug?: boolean;
  dev?: boolean;
  docs?: boolean;
  docsApi?: string;
  docsJson?: string;
  e2e?: boolean;
  emulate?: string;
  es5?: boolean;
  headless?: boolean;
  help?: boolean;
  log?: boolean;
  logLevel?: string;
  verbose?: boolean;
  maxWorkers?: number;
  open?: boolean;
  port?: number;
  prerender?: boolean;
  prod?: boolean;
  profile?: boolean;
  root?: string;
  screenshot?: boolean;
  screenshotConnector?: string;
  serve?: boolean;
  serviceWorker?: boolean;
  spec?: boolean;
  stats?: boolean;
  updateScreenshot?: boolean;
  version?: boolean;
  watch?: boolean;
  devtools?: boolean;
}

export type TaskCommand = 'build' | 'docs' | 'generate' | 'g' | 'help' | 'info' | 'prerender' | 'serve' | 'test' | 'version';

export type PageReloadStrategy = 'hmr' | 'pageReload' | null;

/**
 * The prerender config is used when prerendering a `www` output target.
 * Within `stencil.config.ts`, set the path to the prerendering
 * config file path using the `prerenderConfig` property, such as:
 *
 * ```tsx
 * import { Config } from '@stencil/core';
 * export const config: Config = {
 *   outputTargets: [
 *     {
 *       type: 'www',
 *       baseUrl: 'https://stenciljs.com/',
 *       prerenderConfig: './prerender.config.ts',
 *     }
 *   ]
 * };
 * ```
 *
 * The `prerender.config.ts` should export a `config` object using
 * the `PrerenderConfig` interface.
 *
 * ```tsx
 * import { PrerenderConfig } from '@stencil/core';
 * export const config: PrerenderConfig = {
 *   ...
 * };
 * ```
 *
 * For more info: https://stenciljs.com/docs/static-site-generation
 */
export interface PrerenderConfig {
  /**
   * Run after each `document` is hydrated, but before it is serialized
   * into an HTML string. Hook is passed the `document` and its `URL`.
   */
  afterHydrate?(document?: Document, url?: URL): any | Promise<any>;
  /**
   * Run before each `document` is hydrated. Hook is passed the `document` it's `URL`.
   */
  beforeHydrate?(document?: Document, url?: URL): any | Promise<any>;
  /**
   * Runs after the template Document object has serialize into an
   * HTML formatted string. Returns an HTML string to be used as the
   * base template for all prerendered pages.
   */
  afterSerializeTemplate?(html: string): string | Promise<string>;
  /**
   * Runs before the template Document object is serialize into an
   * HTML formatted string. Returns the Document to be serialized which
   * will become the base template html for all prerendered pages.
   */
  beforeSerializeTemplate?(document: Document): Document | Promise<Document>;
  /**
   * A hook to be used to generate the canonical `<link>` tag
   * which goes in the `<head>` of every prerendered page. Returning `null`
   * will not add a canonical url tag to the page.
   */
  canonicalUrl?(url?: URL): string | null;
  /**
   * While prerendering, crawl same-origin URLs found within `<a href>` elements.
   * Defaults to `true`.
   */
  crawlUrls?: boolean;
  /**
   * URLs to start the prerendering from. By default the root URL of `/` is used.
   */
  entryUrls?: string[];
  /**
   * Return `true` the given `<a>` element should be crawled or not.
   */
  filterAnchor?(attrs: { [attrName: string]: string }, base?: URL): boolean;
  /**
   * Return `true` if the given URL should be prerendered or not.
   */
  filterUrl?(url?: URL, base?: URL): boolean;
  /**
   * Returns the file path which the prerendered HTML content
   * should be written to.
   */
  filePath?(url?: URL, filePath?: string): string;
  /**
   * Returns the hydrate options to use for each individual prerendered page.
   */
  hydrateOptions?(url?: URL): PrerenderHydrateOptions;
  /**
   * Returns the template file's content. The template is the base
   * HTML used for all prerendered pages.
   */
  loadTemplate?(filePath?: string): string | Promise<string>;
  /**
   * Used to normalize the page's URL from a given a string and the current
   * page's base URL. Largely used when reading an anchor's `href` attribute
   * value and normalizing it into a `URL`.
   */
  normalizeUrl?(href?: string, base?: URL): URL;
  robotsTxt?(opts: RobotsTxtOpts): string | RobotsTxtResults;
  sitemapXml?(opts: SitemapXmpOpts): string | SitemapXmpResults;
  /**
   * Static Site Generated (SSG). Does not include Stencil's clientside
   * JavaScript, custom elements or preload modules.
   */
  staticSite?: boolean;
  /**
   * If the prerenndered URLs should have a trailing "/"" or not. Defaults to `false`.
   */
  trailingSlash?: boolean;
}

export interface HydrateDocumentOptions {
  /**
   * Sets the `href` attribute on the `<link rel="canonical">`
   * tag within the `<head>`. If the value is not defined it will
   * ensure a canonical link tag is no included in the `<head>`.
   */
  canonicalUrl?: string;
  /**
   * Constrain `setTimeout()` to 1ms, but still async. Also
   * only allows `setInterval()` to fire once, also constrained to 1ms.
   * Defaults to `true`.
   */
  constrainTimeouts?: boolean;
  /**
   * Include the HTML comments and attributes used by the clientside
   * JavaScript to read the structure of the HTML and rebuild each
   * component. Defaults to `true`.
   */
  clientHydrateAnnotations?: boolean;
  /**
   * Sets `document.cookie`
   */
  cookie?: string;
  /**
   * Sets the `dir` attribute on the top level `<html>`.
   */
  direction?: string;
  /**
   * Component tag names listed here will not be prerendered, nor will
   * hydrated on the clientside. Components listed here will be ignored
   * as custom elements and treated no differently than a `<div>`.
   */
  excludeComponents?: string[];
  /**
   * Sets the `lang` attribute on the top level `<html>`.
   */
  language?: string;
  /**
   * Maximum number of components to hydrate on one page. Defaults to `300`.
   */
  maxHydrateCount?: number;
  /**
   * Sets `document.referrer`
   */
  referrer?: string;
  /**
   * Removes every `<script>` element found in the `document`. Defaults to `false`.
   */
  removeScripts?: boolean;
  /**
   * Removes CSS not used by elements within the `document`. Defaults to `true`.
   */
  removeUnusedStyles?: boolean;
  /**
   * The url the runtime uses for the resources, such as the assets directory.
   */
  resourcesUrl?: string;
  /**
   * Prints out runtime console logs to the NodeJS process. Defaults to `false`.
   */
  runtimeLogging?: boolean;
  /**
   * Component tags listed here will only be prerendered or serverside-rendered
   * and will not be clientside hydrated. This is useful for components that
   * are not dynamic and do not need to be defined as a custom element within the
   * browser. For example, a header or footer component would be a good example that
   * may not require any clientside JavaScript.
   */
  staticComponents?: string[];
  /**
   * The amount of milliseconds to wait for a page to finish rendering until
   * a timeout error is thrown. Defaults to `15000`.
   */
  timeout?: number;
  /**
   * Sets `document.title`.
   */
  title?: string;
  /**
   * Sets `location.href`
   */
  url?: string;
  /**
   * Sets `navigator.userAgent`
   */
  userAgent?: string;
}

export interface SerializeDocumentOptions extends HydrateDocumentOptions {
  /**
   * Runs after the `document` has been hydrated.
   */
  afterHydrate?(document: any): any | Promise<any>;
  /**
   * Sets an approximate line width the HTML should attempt to stay within.
   * Note that this is "approximate", in that HTML may often not be able
   * to be split at an exact line width. Additionally, new lines created
   * is where HTML naturally already has whitespce, such as before an
   * attribute or spaces between words. Defaults to `100`.
   */
  approximateLineWidth?: number;
  /**
   * Runs before the `document` has been hydrated.
   */
  beforeHydrate?(document: any): any | Promise<any>;
  /**
   * Format the HTML in a nicely indented format.
   * Defaults to `false`.
   */
  prettyHtml?: boolean;
  /**
   * Remove quotes from attribute values when possible.
   * Defaults to `true`.
   */
  removeAttributeQuotes?: boolean;
  /**
   * Remove the `=""` from standardized `boolean` attributes,
   * such as `hidden` or `checked`. Defaults to `true`.
   */
  removeBooleanAttributeQuotes?: boolean;
  /**
   * Remove these standardized attributes when their value is empty:
   * `class`, `dir`, `id`, `lang`, and `name`, `title`. Defaults to `true`.
   */
  removeEmptyAttributes?: boolean;
  /**
   * Remove HTML comments. Defaults to `true`.
   */
  removeHtmlComments?: boolean;
}

export interface HydrateFactoryOptions extends SerializeDocumentOptions {
  serializeToHtml: boolean;
  destroyWindow: boolean;
  destroyDocument: boolean;
}

export interface PrerenderHydrateOptions extends SerializeDocumentOptions {
  /**
   * Adds `<link rel="modulepreload">` for modules that will eventually be requested.
   * Defaults to `true`.
   */
  addModulePreloads?: boolean;
  /**
   * External stylesheets from `<link rel="stylesheet">` are instead inlined
   * into `<style>` elements. Defaults to `true`.
   */
  inlineExternalStyleSheets?: boolean;
  /**
   * Minify CSS content within `<style>` elements. Defaults to `true`.
   */
  minifyStyleElements?: boolean;
  /**
   * Minify JavaScript content within `<script>` elements. Defaults to `true`.
   */
  minifyScriptElements?: boolean;
  /**
   * Entire `document` should be static. This is useful for specific pages that
   * should be static, rather than the entire site. If the whole site should be static,
   * use the `staticSite` property on the prerender config instead. If only certain
   * components should be static then use `staticComponents` instead.
   */
  staticDocument?: boolean;
}

export interface RobotsTxtOpts {
  urls: string[];
  sitemapUrl: string;
  baseUrl: string;
  dir: string;
}

export interface RobotsTxtResults {
  content: string;
  filePath: string;
  url: string;
}

export interface SitemapXmpOpts {
  urls: string[];
  baseUrl: string;
  dir: string;
}

export interface SitemapXmpResults {
  content: string;
  filePath: string;
  url: string;
}

/**
 * Common system used by the compiler. All file reads, writes, access, etc. will all use
 * this system. Additionally, throughout each build, the compiler will use an internal
 * in-memory file system as to prevent unnecessary fs reads and writes. At the end of each
 * build all actions the in-memory fs performed will be written to disk using this system.
 * A NodeJS based system will use APIs such as `fs` and `crypto`, and a web-based system
 * will use in-memory Maps and browser APIs. Either way, the compiler itself is unaware
 * of the actual platform it's being ran ontop of.
 */
export interface CompilerSystem {
  name: 'deno' | 'node' | 'in-memory';
  version: string;
  events?: BuildEvents;
  details?: SystemDetails;
  /**
   * Add a callback which will be ran when destroy() is called.
   */
  addDestory(cb: () => void): void;
  /**
   * Always returns a boolean, does not throw.
   */
  access(p: string): Promise<boolean>;
  /**
   * SYNC! Always returns a boolean, does not throw.
   */
  accessSync(p: string): boolean;
  applyGlobalPatch?(fromDir: string): Promise<void>;
  cacheStorage?: CacheStorage;
  checkVersion?: (logger: Logger, currentVersion: string) => Promise<() => void>;
  copy?(copyTasks: Required<CopyTask>[], srcDir: string): Promise<CopyResults>;
  /**
   * Always returns a boolean if the files were copied or not. Does not throw.
   */
  copyFile(src: string, dst: string): Promise<boolean>;
  /**
   * Used to destroy any listeners, file watchers or child processes.
   */
  destroy(): Promise<void>;
  dynamicImport?(p: string): Promise<any>;
  /**
   * Creates the worker controller for the current system.
   */
  createWorkerController?(maxConcurrentWorkers: number): WorkerMainController;
  encodeToBase64(str: string): string;
  ensureDependencies?(opts: {
    rootDir: string;
    logger: Logger;
    dependencies: CompilerDependency[];
  }): Promise<{ stencilPath: string; typescriptPath: string; diagnostics: Diagnostic[] }>;
  ensureResources?(opts: { rootDir: string; logger: Logger; dependencies: CompilerDependency[] }): Promise<void>;
  /**
   * process.exit()
   */
  exit(exitCode: number): void;
  /**
   * Optionally provide a fetch() function rather than using the built-in fetch().
   * First arg is a url string or Request object (RequestInfo).
   * Second arg is the RequestInit. Returns the Response object
   */
  fetch?(input: string | any, init?: any): Promise<any>;
  /**
   * Generates a MD5 digest encoded as HEX
   */
  generateContentHash?(content: string, length?: number): Promise<string>;
  /**
   * Get the current directory.
   */
  getCurrentDirectory(): string;
  /**
   * The compiler's executing path.
   */
  getCompilerExecutingPath(): string;
  /**
   * The dev server's executing path.
   */
  getDevServerExecutingPath?(): string;
  getEnvironmentVar?(key: string): string;
  /**
   * Gets the absolute file path when for a dependency module.
   */
  getLocalModulePath(opts: { rootDir: string; moduleId: string; path: string }): string;
  /**
   * Gets the full url when requesting a dependency module to fetch from a CDN.
   */
  getRemoteModuleUrl(opts: { moduleId: string; path?: string; version?: string }): string;
  /**
   * Aync glob task. Only available in NodeJS compiler system.
   */
  glob?(pattern: string, options: { cwd?: string; nodir?: boolean; [key: string]: any }): Promise<string[]>;
  /**
   * The number of logical processors available to run threads on the user's computer (cpus).
   */
  hardwareConcurrency: number;
  /**
   * Tests if the path is a symbolic link or not. Always resolves a boolean. Does not throw.
   */
  isSymbolicLink(p: string): Promise<boolean>;
  lazyRequire?: LazyRequire;
  /**
   * Does not throw.
   */
  mkdir(p: string, opts?: CompilerSystemMakeDirectoryOptions): Promise<CompilerSystemMakeDirectoryResults>;
  /**
   * SYNC! Does not throw.
   */
  mkdirSync(p: string, opts?: CompilerSystemMakeDirectoryOptions): CompilerSystemMakeDirectoryResults;
  nextTick(cb: () => void): void;
  /**
   * Normalize file system path.
   */
  normalizePath(p: string): string;
  onProcessInterrupt?(cb: () => void): void;
  platformPath: PlatformPath;
  /**
   * All return paths are full normalized paths, not just the file names. Always returns an array, does not throw.
   */
  readdir(p: string): Promise<string[]>;
  /**
   * SYNC! All return paths are full normalized paths, not just the file names. Always returns an array, does not throw.
   */
  readdirSync(p: string): string[];
  /**
   * Returns undefined if file is not found. Does not throw.
   */
  readFile(p: string, encoding?: string): Promise<string>;
  /**
   * SYNC! Returns undefined if file is not found. Does not throw.
   */
  readFileSync(p: string, encoding?: string): string;
  /**
   * Does not throw.
   */
  realpath(p: string): Promise<CompilerSystemRealpathResults>;
  /**
   * SYNC! Does not throw.
   */
  realpathSync(p: string): CompilerSystemRealpathResults;
  /**
   * Remove a callback which will be ran when destroy() is called.
   */
  removeDestory(cb: () => void): void;
  /**
   * Rename old path to new path. Does not throw.
   */
  rename(oldPath: string, newPath: string): Promise<CompilerSystemRenameResults>;
  resolveModuleId?(opts: ResolveModuleIdOptions): Promise<ResolveModuleIdResults>;
  resolvePath(p: string): string;
  /**
   * Does not throw.
   */
  rmdir(p: string, opts?: CompilerSystemRemoveDirectoryOptions): Promise<CompilerSystemRemoveDirectoryResults>;
  /**
   * SYNC! Does not throw.
   */
  rmdirSync(p: string, opts?: CompilerSystemRemoveDirectoryOptions): CompilerSystemRemoveDirectoryResults;
  /**
   * Returns undefined if stat not found. Does not throw.
   */
  stat(p: string): Promise<CompilerFsStats>;
  /**
   * SYNC! Returns undefined if stat not found. Does not throw.
   */
  statSync(p: string): CompilerFsStats;
  tmpdir(): string;
  /**
   * Does not throw.
   */
  unlink(p: string): Promise<CompilerSystemUnlinkResults>;
  /**
   * SYNC! Does not throw.
   */
  unlinkSync(p: string): CompilerSystemUnlinkResults;
  watchDirectory?(p: string, callback: CompilerFileWatcherCallback, recursive?: boolean): CompilerFileWatcher;
  watchFile?(p: string, callback: CompilerFileWatcherCallback): CompilerFileWatcher;
  /**
   * How many milliseconds to wait after a change before calling watch callbacks.
   */
  watchTimeout?: number;
  /**
   * Does not throw.
   */
  writeFile(p: string, content: string): Promise<CompilerSystemWriteFileResults>;
  /**
   * SYNC! Does not throw.
   */
  writeFileSync(p: string, content: string): CompilerSystemWriteFileResults;
}

export interface TranspileOnlyResults {
  diagnostics: Diagnostic[];
  output: string;
  sourceMap: any;
}

export interface ParsedPath {
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
}

export interface PlatformPath {
  normalize(p: string): string;
  join(...paths: string[]): string;
  resolve(...pathSegments: string[]): string;
  isAbsolute(p: string): boolean;
  relative(from: string, to: string): string;
  dirname(p: string): string;
  basename(p: string, ext?: string): string;
  extname(p: string): string;
  parse(p: string): ParsedPath;
  sep: string;
  delimiter: string;
  posix: any;
  win32: any;
}

export interface CompilerDependency {
  name: string;
  version: string;
  main: string;
  resources?: string[];
}

export interface ResolveModuleIdOptions {
  moduleId: string;
  containingFile?: string;
  exts?: string[];
  packageFilter?: (pkg: any) => void;
}

export interface ResolveModuleIdResults {
  moduleId: string;
  resolveId: string;
  pkgData: { name: string; version: string; [key: string]: any };
  pkgDirPath: string;
}

export interface WorkerMainController {
  send(...args: any[]): Promise<any>;
  handler(name: string): (...args: any[]) => Promise<any>;
  destroy(): void;
  maxWorkers: number;
}

export interface CopyResults {
  diagnostics: Diagnostic[];
  filePaths: string[];
  dirPaths: string[];
}

export interface SystemDetails {
  cpuModel: string;
  freemem(): number;
  platform: 'darwin' | 'windows' | 'linux' | '';
  release: string;
  totalmem: number;
}

export interface BuildOnEvents {
  on(cb: (eventName: CompilerEventName, data: any) => void): BuildOnEventRemove;

  on(eventName: CompilerEventFileAdd, cb: (path: string) => void): BuildOnEventRemove;
  on(eventName: CompilerEventFileDelete, cb: (path: string) => void): BuildOnEventRemove;
  on(eventName: CompilerEventFileUpdate, cb: (path: string) => void): BuildOnEventRemove;

  on(eventName: CompilerEventDirAdd, cb: (path: string) => void): BuildOnEventRemove;
  on(eventName: CompilerEventDirDelete, cb: (path: string) => void): BuildOnEventRemove;

  on(eventName: CompilerEventBuildStart, cb: (buildStart: CompilerBuildStart) => void): BuildOnEventRemove;
  on(eventName: CompilerEventBuildFinish, cb: (buildResults: CompilerBuildResults) => void): BuildOnEventRemove;
  on(eventName: CompilerEventBuildLog, cb: (buildLog: BuildLog) => void): BuildOnEventRemove;
  on(eventName: CompilerEventBuildNoChange, cb: () => void): BuildOnEventRemove;
}

export interface BuildEmitEvents {
  emit(eventName: CompilerEventFileAdd, path: string): void;
  emit(eventName: CompilerEventFileDelete, path: string): void;
  emit(eventName: CompilerEventFileUpdate, path: string): void;

  emit(eventName: CompilerEventDirAdd, path: string): void;
  emit(eventName: CompilerEventDirDelete, path: string): void;

  emit(eventName: CompilerEventBuildStart, buildStart: CompilerBuildStart): void;
  emit(eventName: CompilerEventBuildFinish, buildResults: CompilerBuildResults): void;
  emit(eventName: CompilerEventBuildNoChange, buildNoChange: BuildNoChangeResults): void;
  emit(eventName: CompilerEventBuildLog, buildLog: BuildLog): void;

  emit(eventName: CompilerEventFsChange, fsWatchResults: FsWatchResults): void;
}

export interface FsWatchResults {
  dirsAdded: string[];
  dirsDeleted: string[];
  filesUpdated: string[];
  filesAdded: string[];
  filesDeleted: string[];
}

export interface BuildLog {
  buildId: number;
  messages: string[];
  progress: number;
}

export interface BuildNoChangeResults {
  buildId: number;
  noChange: boolean;
}

export interface CompilerBuildResults {
  buildId: number;
  componentGraph?: BuildResultsComponentGraph;
  diagnostics: Diagnostic[];
  dirsAdded: string[];
  dirsDeleted: string[];
  duration: number;
  filesAdded: string[];
  filesChanged: string[];
  filesDeleted: string[];
  filesUpdated: string[];
  hasError: boolean;
  hasSuccessfulBuild: boolean;
  hmr?: HotModuleReplacement;
  hydrateAppFilePath?: string;
  isRebuild: boolean;
  namespace: string;
  outputs: BuildOutput[];
  rootDir: string;
  srcDir: string;
  timestamp: string;
}

export interface BuildResultsComponentGraph {
  [scopeId: string]: string[];
}

export interface BuildOutput {
  type: string;
  files: string[];
}

export interface HotModuleReplacement {
  componentsUpdated?: string[];
  excludeHmr?: string[];
  externalStylesUpdated?: string[];
  imagesUpdated?: string[];
  indexHtmlUpdated?: boolean;
  inlineStylesUpdated?: HmrStyleUpdate[];
  reloadStrategy: PageReloadStrategy;
  scriptsAdded?: string[];
  scriptsDeleted?: string[];
  serviceWorkerUpdated?: boolean;
  versionId?: string;
}

export interface HmrStyleUpdate {
  styleId: string;
  styleTag: string;
  styleText: string;
}

export type BuildOnEventRemove = () => boolean;

export interface BuildEvents extends BuildOnEvents, BuildEmitEvents {
  unsubscribeAll(): void;
}

export interface CompilerBuildStart {
  buildId: number;
  timestamp: string;
}

export type CompilerFileWatcherCallback = (fileName: string, eventKind: CompilerFileWatcherEvent) => void;

export type CompilerFileWatcherEvent = CompilerEventFileAdd | CompilerEventFileDelete | CompilerEventFileUpdate | CompilerEventDirAdd | CompilerEventDirDelete;

export type CompilerEventName =
  | CompilerEventFsChange
  | CompilerEventFileUpdate
  | CompilerEventFileAdd
  | CompilerEventFileDelete
  | CompilerEventDirAdd
  | CompilerEventDirDelete
  | CompilerEventBuildStart
  | CompilerEventBuildFinish
  | CompilerEventBuildNoChange
  | CompilerEventBuildLog;

export type CompilerEventFsChange = 'fsChange';
export type CompilerEventFileUpdate = 'fileUpdate';
export type CompilerEventFileAdd = 'fileAdd';
export type CompilerEventFileDelete = 'fileDelete';
export type CompilerEventDirAdd = 'dirAdd';
export type CompilerEventDirDelete = 'dirDelete';
export type CompilerEventBuildStart = 'buildStart';
export type CompilerEventBuildFinish = 'buildFinish';
export type CompilerEventBuildLog = 'buildLog';
export type CompilerEventBuildNoChange = 'buildNoChange';

export interface CompilerFileWatcher {
  close(): void | Promise<void>;
}

export interface CompilerFsStats {
  isFile(): boolean;
  isDirectory(): boolean;
  isSymbolicLink(): boolean;
  size: number;
  mtime?: {
    getTime(): number;
  };
}

export interface CompilerSystemMakeDirectoryOptions {
  /**
   * Indicates whether parent directories should be created.
   * @default false
   */
  recursive?: boolean;
  /**
   * A file mode. If a string is passed, it is parsed as an octal integer. If not specified
   * @default 0o777.
   */
  mode?: number;
}

export interface CompilerSystemMakeDirectoryResults {
  basename: string;
  dirname: string;
  path: string;
  newDirs: string[];
  error: any;
}

export interface CompilerSystemRemoveDirectoryOptions {
  /**
   * Indicates whether child files and subdirectories should be removed.
   * @default false
   */
  recursive?: boolean;
}

export interface CompilerSystemRemoveDirectoryResults {
  basename: string;
  dirname: string;
  path: string;
  removedDirs: string[];
  removedFiles: string[];
  error: any;
}

export interface CompilerSystemRenameResults extends CompilerSystemRenamedPath {
  renamed: CompilerSystemRenamedPath[];
  oldDirs: string[];
  oldFiles: string[];
  newDirs: string[];
  newFiles: string[];
  error: any;
}

export interface CompilerSystemRenamedPath {
  oldPath: string;
  newPath: string;
  isFile: boolean;
  isDirectory: boolean;
}

export interface CompilerSystemRealpathResults {
  path: string;
  error: any;
}

export interface CompilerSystemUnlinkResults {
  basename: string;
  dirname: string;
  path: string;
  error: any;
}

export interface CompilerSystemWriteFileResults {
  path: string;
  error: any;
}

export interface Credentials {
  key: string;
  cert: string;
}

export interface ConfigBundle {
  components: string[];
}

export interface CopyTask {
  src: string;
  dest?: string;
  warn?: boolean;
  keepDirStructure?: boolean;
}

export interface BundlingConfig {
  namedExports?: {
    [key: string]: string[];
  };
}

export interface NodeResolveConfig {
  module?: boolean;
  jsnext?: boolean;
  main?: boolean;
  browser?: boolean;
  extensions?: string[];
  preferBuiltins?: boolean;
  jail?: string;
  only?: Array<string | RegExp>;
  modulesOnly?: boolean;

  /**
   * @see https://github.com/browserify/resolve#resolveid-opts-cb
   */
  customResolveOptions?: {
    basedir?: string;
    package?: string;
    extensions?: string[];
    readFile?: Function;
    isFile?: Function;
    isDirectory?: Function;
    packageFilter?: Function;
    pathFilter?: Function;
    paths?: Function | string[];
    moduleDirectory?: string | string[];
    preserveSymlinks?: boolean;
  };
}

export interface RollupConfig {
  inputOptions?: RollupInputOptions;
  outputOptions?: RollupOutputOptions;
}

export interface RollupInputOptions {
  context?: string;
  moduleContext?: ((id: string) => string) | { [id: string]: string };
  treeshake?: boolean;
}

export interface RollupOutputOptions {
  globals?: { [name: string]: string } | ((name: string) => string);
}

export interface Testing {
  run(opts: TestingRunOptions): Promise<boolean>;
  destroy(): Promise<void>;
}

export interface TestingRunOptions {
  e2e?: boolean;
  screenshot?: boolean;
  spec?: boolean;
  updateScreenshot?: boolean;
}

export interface JestConfig {
  /**
   * This option tells Jest that all imported modules in your tests should be mocked automatically.
   * All modules used in your tests will have a replacement implementation, keeping the API surface. Default: false
   */
  automock?: boolean;

  /**
   * By default, Jest runs all tests and produces all errors into the console upon completion.
   * The bail config option can be used here to have Jest stop running tests after the first failure. Default: false
   */
  bail?: boolean;

  /**
   * The directory where Jest should store its cached dependency information. Jest attempts to scan your dependency tree once (up-front)
   * and cache it in order to ease some of the filesystem raking that needs to happen while running tests. This config option lets you
   * customize where Jest stores that cache data on disk. Default: "/tmp/<path>"
   */
  cacheDirectory?: string;

  /**
   * Automatically clear mock calls and instances between every test. Equivalent to calling jest.clearAllMocks()
   * between each test. This does not remove any mock implementation that may have been provided. Default: false
   */
  clearMocks?: boolean;

  /**
   * Indicates whether the coverage information should be collected while executing the test. Because this retrofits all
   * executed files with coverage collection statements, it may significantly slow down your tests. Default: false
   */
  collectCoverage?: boolean;

  /**
   * An array of glob patterns indicating a set of files for which coverage information should be collected.
   * If a file matches the specified glob pattern, coverage information will be collected for it even if no tests exist
   * for this file and it's never required in the test suite. Default: undefined
   */
  collectCoverageFrom?: any[];

  /**
   * The directory where Jest should output its coverage files. Default: undefined
   */
  coverageDirectory?: string;

  /**
   * An array of regexp pattern strings that are matched against all file paths before executing the test. If the file path matches
   * any of the patterns, coverage information will be skipped. These pattern strings match against the full path.
   * Use the <rootDir> string token to include the path to your project's root directory to prevent it from accidentally
   * ignoring all of your files in different environments that may have different root directories.
   * Example: ["<rootDir>/build/", "<rootDir>/node_modules/"]. Default: ["/node_modules/"]
   */
  coveragePathIgnorePatterns?: any[];

  /**
   * A list of reporter names that Jest uses when writing coverage reports. Any istanbul reporter can be used.
   * Default: ["json", "lcov", "text"]
   */
  coverageReporters?: any[];

  /**
   * This will be used to configure minimum threshold enforcement for coverage results. Thresholds can be specified as global,
   * as a glob, and as a directory or file path. If thresholds aren't met, jest will fail. Thresholds specified as a positive
   * number are taken to be the minimum percentage required. Thresholds specified as a negative number represent the maximum
   * number of uncovered entities allowed. Default: undefined
   */
  coverageThreshold?: any;

  errorOnDeprecated?: boolean;
  forceCoverageMatch?: any[];
  globals?: any;
  globalSetup?: string;
  globalTeardown?: string;

  /**
   * An array of directory names to be searched recursively up from the requiring module's location. Setting this option will
   * override the default, if you wish to still search node_modules for packages include it along with any other
   * options: ["node_modules", "bower_components"]. Default: ["node_modules"]
   */
  moduleDirectories?: string[];

  /**
   * An array of file extensions your modules use. If you require modules without specifying a file extension,
   * these are the extensions Jest will look for. Default: ['ts', 'tsx', 'js', 'json']
   */
  moduleFileExtensions?: string[];

  moduleNameMapper?: any;
  modulePaths?: any[];
  modulePathIgnorePatterns?: any[];
  notify?: boolean;
  notifyMode?: string;
  preset?: string;
  prettierPath?: string;
  projects?: any;
  reporters?: any;
  resetMocks?: boolean;
  resetModules?: boolean;
  resolver?: string;
  restoreMocks?: string;
  rootDir?: string;
  roots?: any[];
  runner?: string;

  /**
   * The paths to modules that run some code to configure or set up the testing environment before each test.
   * Since every test runs in its own environment, these scripts will be executed in the testing environment
   * immediately before executing the test code itself. Default: []
   */
  setupFiles?: string[];

  setupFilesAfterEnv?: string[];

  /**
   * @deprecated Use setupFilesAfterEnv instead.
   */
  setupTestFrameworkScriptFile?: string;
  snapshotSerializers?: any[];
  testEnvironment?: string;
  testEnvironmentOptions?: any;
  testMatch?: string[];
  testPathIgnorePatterns?: string[];
  testPreset?: string;
  testRegex?: string;
  testResultsProcessor?: string;
  testRunner?: string;
  testURL?: string;
  timers?: string;
  transform?: { [key: string]: string };
  transformIgnorePatterns?: any[];
  unmockedModulePathPatterns?: any[];
  verbose?: boolean;
  watchPathIgnorePatterns?: any[];
}

export interface TestingConfig extends JestConfig {
  /**
   * The `allowableMismatchedPixels` value is used to determine an acceptable
   * number of pixels that can be mismatched before the image is considered
   * to have changes. Realistically, two screenshots representing the same
   * content may have a small number of pixels that are not identical due to
   * anti-aliasing, which is perfectly normal. If the `allowableMismatchedRatio`
   * is provided it will take precedence, otherwise `allowableMismatchedPixels`
   * will be used.
   */
  allowableMismatchedPixels?: number;

  /**
   * The `allowableMismatchedRatio` ranges from `0` to `1` and is used to
   * determine an acceptable ratio of pixels that can be mismatched before
   * the image is considered to have changes. Realistically, two screenshots
   * representing the same content may have a small number of pixels that
   * are not identical due to anti-aliasing, which is perfectly normal. The
   * `allowableMismatchedRatio` is the number of pixels that were mismatched,
   * divided by the total number of pixels in the screenshot. For example,
   * a ratio value of `0.06` means 6% of the pixels can be mismatched before
   * the image is considered to have changes. If the `allowableMismatchedRatio`
   * is provided it will take precedence, otherwise `allowableMismatchedPixels`
   * will be used.
   */
  allowableMismatchedRatio?: number;

  /**
   * Matching threshold while comparing two screenshots. Value ranges from `0` to `1`.
   * Smaller values make the comparison more sensitive. The `pixelmatchThreshold`
   * value helps to ignore anti-aliasing. Default: `0.1`
   */
  pixelmatchThreshold?: number;

  /**
   * Additional arguments to pass to the browser instance.
   */
  browserArgs?: string[];

  /**
   * Path to a Chromium or Chrome executable to run instead of the bundled Chromium.
   */
  browserExecutablePath?: string;

  /**
   * Url of remote Chrome instance to use instead of local Chrome.
   */
  browserWSEndpoint?: string;

  /**
   * Whether to run browser e2e tests in headless mode. Defaults to true.
   */
  browserHeadless?: boolean;

  /**
   * Slows down e2e browser operations by the specified amount of milliseconds.
   * Useful so that you can see what is going on.
   */
  browserSlowMo?: number;

  /**
   * By default, all E2E pages wait until the "load" event, this global setting can be used
   * to change the default `waitUntil` behaviour.
   */
  browserWaitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

  /**
   * Whether to auto-open a DevTools panel for each tab.
   * If this option is true, the headless option will be set false
   */
  browserDevtools?: boolean;

  /**
   * Array of browser emulations to be using during e2e tests. A full e2e
   * test is ran for each emulation.
   */
  emulate?: EmulateConfig[];

  /**
   * Path to the Screenshot Connector module.
   */
  screenshotConnector?: string;

  /**
   * Amount of time in milliseconds to wait before a screenshot is taken.
   */
  waitBeforeScreenshot?: number;
}

export interface EmulateConfig {
  /**
   * Predefined device descriptor name, such as "iPhone X" or "Nexus 10".
   * For a complete list please see: https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
   */
  device?: string;

  /**
   * User-Agent to be used. Defaults to the user-agent of the installed Puppeteer version.
   */
  userAgent?: string;

  viewport?: EmulateViewport;
}

export interface EmulateViewport {
  /**
   * Page width in pixels.
   */
  width: number;

  /**
   * page height in pixels.
   */
  height: number;

  /**
   * Specify device scale factor (can be thought of as dpr). Defaults to 1.
   */
  deviceScaleFactor?: number;

  /**
   * Whether the meta viewport tag is taken into account. Defaults to false.
   */
  isMobile?: boolean;

  /**
   * Specifies if viewport supports touch events. Defaults to false
   */
  hasTouch?: boolean;

  /**
   * Specifies if viewport is in landscape mode. Defaults to false.
   */
  isLandscape?: boolean;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | string;

/**
 * Common logger to be used by the compiler, dev-server and CLI. The CLI will use a
 * NodeJS based console logging and colors, and the web will use browser based
 * logs and colors.
 */
export interface Logger {
  enableColors: (useColors: boolean) => void;
  setLevel: (level: LogLevel) => void;
  getLevel: () => LogLevel;
  debug: (...msg: any[]) => void;
  info: (...msg: any[]) => void;
  warn: (...msg: any[]) => void;
  error: (...msg: any[]) => void;
  createTimeSpan: (startMsg: string, debug?: boolean, appendTo?: string[]) => LoggerTimeSpan;
  printDiagnostics: (diagnostics: Diagnostic[], cwd?: string) => void;
  red: (msg: string) => string;
  green: (msg: string) => string;
  yellow: (msg: string) => string;
  blue: (msg: string) => string;
  magenta: (msg: string) => string;
  cyan: (msg: string) => string;
  gray: (msg: string) => string;
  bold: (msg: string) => string;
  dim: (msg: string) => string;
  bgRed: (msg: string) => string;
  emoji: (e: string) => string;
  setLogFilePath?: (p: string) => void;
  writeLogs?: (append: boolean) => void;
  createLineUpdater?: () => Promise<LoggerLineUpdater>;
}

export interface LoggerLineUpdater {
  update(text: string): Promise<void>;
  stop(): Promise<void>;
}

export interface LoggerTimeSpan {
  duration(): number;
  finish(finishedMsg: string, color?: string, bold?: boolean, newLineSuffix?: boolean): number;
}

export interface OutputTargetDist extends OutputTargetBase {
  type: 'dist';

  buildDir?: string;
  dir?: string;

  collectionDir?: string | null;
  typesDir?: string;
  esmLoaderPath?: string;
  copy?: CopyTask[];
  polyfills?: boolean;

  empty?: boolean;
}

export interface OutputTargetDistCollection extends OutputTargetBase {
  type: 'dist-collection';

  dir: string;
  collectionDir: string;
}

export interface OutputTargetDistTypes extends OutputTargetBase {
  type: 'dist-types';

  dir: string;
  typesDir: string;
}

export interface OutputTargetDistLazy extends OutputTargetBase {
  type: 'dist-lazy';

  dir?: string;
  esmDir?: string;
  esmEs5Dir?: string;
  systemDir?: string;
  cjsDir?: string;
  polyfills?: boolean;
  isBrowserBuild?: boolean;

  esmIndexFile?: string;
  cjsIndexFile?: string;
  systemLoaderFile?: string;
  legacyLoaderFile?: string;
  empty?: boolean;
}

export interface OutputTargetDistGlobalStyles extends OutputTargetBase {
  type: 'dist-global-styles';
  file: string;
}

export interface OutputTargetDistLazyLoader extends OutputTargetBase {
  type: 'dist-lazy-loader';
  dir: string;

  esmDir: string;
  esmEs5Dir: string;
  cjsDir: string;
  componentDts: string;

  empty: boolean;
}

export interface OutputTargetDistSelfContained extends OutputTargetBase {
  type: 'dist-self-contained';

  dir?: string;
  buildDir?: string;

  empty?: boolean;
}

export interface OutputTargetHydrate extends OutputTargetBase {
  type: 'dist-hydrate-script';
  dir?: string;

  empty?: boolean;
}

export interface OutputTargetCustom extends OutputTargetBase {
  type: 'custom';
  name: string;
  validate?: (config: Config, diagnostics: Diagnostic[]) => void;
  generator: (config: Config, compilerCtx: any, buildCtx: any, docs: any) => Promise<void>;
  copy?: CopyTask[];
}

export interface OutputTargetDocsVscode extends OutputTargetBase {
  type: 'docs-vscode';
  file: string;
  sourceCodeBaseUrl?: string;
}

export interface OutputTargetDocsReadme extends OutputTargetBase {
  type: 'docs-readme' | 'docs';
  dir?: string;
  dependencies?: boolean;
  footer?: string;
  strict?: boolean;
}

export interface OutputTargetDocsJson extends OutputTargetBase {
  type: 'docs-json';

  file: string;
  typesFile?: string | null;
  strict?: boolean;
}

export interface OutputTargetDocsCustom extends OutputTargetBase {
  type: 'docs-custom';

  generator: (docs: JsonDocs) => void | Promise<void>;
  strict?: boolean;
}

export interface OutputTargetStats extends OutputTargetBase {
  type: 'stats';

  file?: string;
}

export interface OutputTargetBaseNext {
  type: string;
  dir?: string;
}

export interface OutputTargetDistCustomElements extends OutputTargetBaseNext {
  type: 'dist-custom-elements';
  empty?: boolean;
  copy?: CopyTask[];
}

export interface OutputTargetDistCustomElementsBundle extends OutputTargetBaseNext {
  //  dist-custom-elements-bundle
  type: 'dist-custom-elements-bundle' | 'experimental-dist-module';
  empty?: boolean;
  externalRuntime?: boolean;
  copy?: CopyTask[];
  inlineDynamicImports?: boolean;
}

export interface OutputTargetBase {
  type: string;
}

export type OutputTargetBuild = OutputTargetDistCollection | OutputTargetDistLazy;

export interface OutputTargetAngular extends OutputTargetBase {
  type: 'angular';

  componentCorePackage: string;
  directivesProxyFile?: string;
  directivesArrayFile?: string;
  directivesUtilsFile?: string;
  excludeComponents?: string[];
}

export interface OutputTargetCopy extends OutputTargetBase {
  type: 'copy';

  dir: string;
  copy?: CopyTask[];
  copyAssets?: 'collection' | 'dist';
}

export interface OutputTargetWww extends OutputTargetBase {
  /**
   * Webapp output target.
   */
  type: 'www';

  /**
   * The directory to write the app's JavaScript and CSS build
   * files to. The default is to place this directory as a child
   * to the `dir` config. Default: `build`
   */
  buildDir?: string;

  /**
   * The directory to write the entire application to.
   * Note, the `buildDir` is where the app's JavaScript and CSS build
   * files are written. Default: `www`
   */
  dir?: string;

  /**
   * Empty the build directory of all files and directories on first build.
   * Default: `true`
   */
  empty?: boolean;

  /**
   * The default index html file of the app, commonly found at the
   * root of the `src` directory.
   * Default: `index.html`
   */
  indexHtml?: string;

  /**
   * The copy config is an array of objects that defines any files or folders that should
   * be copied over to the build directory.
   *
   * Each object in the array must include a src property which can be either an absolute path,
   * a relative path or a glob pattern. The config can also provide an optional dest property
   * which can be either an absolute path or a path relative to the build directory.
   * Also note that any files within src/assets are automatically copied to www/assets for convenience.
   *
   * In the copy config below, it will copy the entire directory from src/docs-content over to www/docs-content.
   */
  copy?: CopyTask[];

  /**
   * The base url of the app, it's required during prerendering to be the absolute path
   * of your app, such as: `https://my.app.com/app`.
   *
   * Default: `/`
   */
  baseUrl?: string;

  /**
   * By default, stencil will include all the polyfills required by legacy browsers in the ES5 build.
   * If it's `false`, stencil will not emit this polyfills anymore and it's your responsability to provide them before
   * stencil initializes.
   */
  polyfills?: boolean;

  /**
   * Path to an external node module which has exports of the prerender config object.
   * ```
   * module.exports = {
   *   afterHydrate(document, url) {
   *     document.title = `URL: ${url.href}`;
   *   }
   * }
   * ```
   */
  prerenderConfig?: string;

  /**
   * Service worker config for production builds. During development builds
   * service worker script will be injected to automatically unregister existing
   * service workers. When set to `false` neither a service worker registration
   * or unregistration will be added to the index.html.
   */
  serviceWorker?: ServiceWorkerConfig | null | false;
  appDir?: string;
}

export type OutputTarget =
  | OutputTargetAngular
  | OutputTargetCopy
  | OutputTargetCustom
  | OutputTargetDist
  | OutputTargetDistCollection
  | OutputTargetDistCustomElements
  | OutputTargetDistCustomElementsBundle
  | OutputTargetDistLazy
  | OutputTargetDistGlobalStyles
  | OutputTargetDistLazyLoader
  | OutputTargetDistSelfContained
  | OutputTargetDocsJson
  | OutputTargetDocsCustom
  | OutputTargetDocsReadme
  | OutputTargetDocsVscode
  | OutputTargetWww
  | OutputTargetHydrate
  | OutputTargetStats
  | OutputTargetDistTypes;

export interface ServiceWorkerConfig {
  // https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config
  unregister?: boolean;

  swDest?: string;
  swSrc?: string;
  globPatterns?: string[];
  globDirectory?: string | string[];
  globIgnores?: string | string[];
  templatedUrls?: any;
  maximumFileSizeToCacheInBytes?: number;
  manifestTransforms?: any;
  modifyUrlPrefix?: any;
  dontCacheBustURLsMatching?: RegExp;
  navigateFallback?: string;
  navigateFallbackWhitelist?: RegExp[];
  navigateFallbackBlacklist?: RegExp[];
  cacheId?: string;
  skipWaiting?: boolean;
  clientsClaim?: boolean;
  directoryIndex?: string;
  runtimeCaching?: any[];
  ignoreUrlParametersMatching?: any[];
  handleFetch?: boolean;
}

export interface LoadConfigInit {
  /**
   * User config object to merge into default config and
   * config loaded from a file path.
   */
  config?: Config;
  /**
   * Absolute path to a Stencil config file. This path cannot be
   * relative and it does not resolve config files within a directory.
   */
  configPath?: string;
  logger?: Logger;
  sys?: CompilerSystem;
  /**
   * When set to true, if the "tsconfig.json" file is not found
   * it'll automatically generate and save a default tsconfig
   * within the root directory.
   */
  initTsConfig?: boolean;
  typescriptPath?: string;
}

export interface LoadConfigResults {
  config: Config;
  diagnostics: Diagnostic[];
  tsconfig: {
    compilerOptions: any;
  };
}

export interface Diagnostic {
  level: 'error' | 'warn' | 'info' | 'log' | 'debug';
  type: string;
  header?: string;
  language?: string;
  messageText: string;
  debugText?: string;
  code?: string;
  absFilePath?: string;
  relFilePath?: string;
  lineNumber?: number;
  columnNumber?: number;
  lines?: {
    lineIndex: number;
    lineNumber: number;
    text?: string;
    errorCharStart: number;
    errorLength?: number;
  }[];
}

export interface CacheStorage {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
}

export interface WorkerOptions {
  maxConcurrentWorkers?: number;
  maxConcurrentTasksPerWorker?: number;
  logger?: Logger;
}

export interface RollupInterface {
  rollup: {
    (config: any): Promise<any>;
  };
  plugins: {
    nodeResolve(opts: any): any;
    replace(opts: any): any;
    commonjs(opts: any): any;
    json(): any;
  };
}

export interface ResolveModuleOptions {
  manuallyResolve?: boolean;
  packageJson?: boolean;
}

export interface PrerenderStartOptions {
  hydrateAppFilePath: string;
  componentGraph: BuildResultsComponentGraph;
  srcIndexHtmlPath: string;
}

export interface PrerenderResults {
  diagnostics: Diagnostic[];
  urls: number;
  duration: number;
  average: number;
}

export interface OptimizeCssInput {
  input: string;
  filePath?: string;
  autoprefixer?: any;
  minify?: boolean;
  sourceMap?: boolean;
}

export interface OptimizeCssOutput {
  output: string;
  diagnostics: Diagnostic[];
}

export interface OptimizeJsInput {
  input: string;
  filePath?: string;
  target?: 'es5' | 'latest';
  pretty?: boolean;
  sourceMap?: boolean;
}

export interface OptimizeJsOutput {
  output: string;
  sourceMap: any;
  diagnostics: Diagnostic[];
}

export interface LazyRequire {
  ensure(logger: Logger, fromDir: string, moduleIds: string[]): Promise<void>;
  require(moduleId: string): any;
  getModulePath(moduleId: string): string;
}

export interface FsWatcher {
  addFile(path: string): Promise<boolean>;
  addDirectory(path: string): Promise<boolean>;
  close(): void;
}

export interface FsWatcherItem {
  close(): void;
}

export interface MakeDirectoryOptions {
  /**
   * Indicates whether parent folders should be created.
   * @default false
   */
  recursive?: boolean;
  /**
   * A file mode. If a string is passed, it is parsed as an octal integer. If not specified
   * @default 0o777.
   */
  mode?: number;
}

export interface FsStats {
  isFile(): boolean;
  isDirectory(): boolean;
  isBlockDevice(): boolean;
  isCharacterDevice(): boolean;
  isSymbolicLink(): boolean;
  isFIFO(): boolean;
  isSocket(): boolean;
  dev: number;
  ino: number;
  mode: number;
  nlink: number;
  uid: number;
  gid: number;
  rdev: number;
  size: number;
  blksize: number;
  blocks: number;
  atime: Date;
  mtime: Date;
  ctime: Date;
  birthtime: Date;
}

export interface FsWriteOptions {
  inMemoryOnly?: boolean;
  clearFileCache?: boolean;
  immediateWrite?: boolean;
  useCache?: boolean;
  outputTargetType?: string;
}

export interface Compiler {
  build(): Promise<CompilerBuildResults>;
  createWatcher(): Promise<CompilerWatcher>;
  destroy(): Promise<void>;
  sys: CompilerSystem;
}

export interface CompilerWatcher extends BuildOnEvents {
  start(): Promise<WatcherCloseResults>;
  close(): Promise<WatcherCloseResults>;
  request(data: CompilerRequest): Promise<CompilerRequestResponse>;
}

export interface CompilerRequest {
  path?: string;
}

export interface WatcherCloseResults {
  exitCode: number;
}

export interface CompilerRequestResponse {
  nodeModuleId: string;
  nodeModuleVersion: string;
  nodeResolvedPath: string;
  cachePath: string;
  cacheHit: boolean;
  content: string;
  status: number;
}

export interface TranspileOptions {
  /**
   * A component can be defined as a custom element by using `customelement`, or the
   * component class can be exported by using `module`. Default is `customelement`.
   */
  componentExport?: 'customelement' | 'module' | string | undefined;
  /**
   * Sets how and if component metadata should be assigned on the compiled
   * component output. The `compilerstatic` value will set the metadata to
   * a static `COMPILER_META` getter on the component class. This option
   * is useful for unit testing preprocessors. Default is `null`.
   */
  componentMetadata?: 'runtimestatic' | 'compilerstatic' | string | undefined;
  /**
   * The actual internal import path for any `@stencil/core` imports.
   * Default is `@stencil/core/internal/client`.
   */
  coreImportPath?: string;
  /**
   * The current working directory. Default is `/`.
   */
  currentDirectory?: string;
  /**
   * The filename of the code being compiled. Default is `module.tsx`.
   */
  file?: string;
  /**
   * Module format to use for the compiled code output, which can be either `esm` or `cjs`.
   * Default is `esm`.
   */
  module?: 'cjs' | 'esm' | string;
  /**
   * Sets how and if any properties, methods and events are proxied on the
   * component class. The `defineproperty` value sets the getters and setters
   * using Object.defineProperty. Default is `defineproperty`.
   */
  proxy?: 'defineproperty' | string | undefined;
  /**
   * How component styles should be associated to the component. The `static`
   * setting will assign the styles as a static getter on the component class.
   */
  style?: 'static' | string | undefined;
  /**
   * The JavaScript source target TypeScript should to transpile to. Values can be
   * `latest`, `esnext`, `es2017`, `es2015`, or `es5`. Defaults to `latest`.
   */
  target?: CompileTarget;
  /**
   * The path used to load TypeScript, which is dependent on which environment
   * the compiler is being used on. Default for NodeJS is `typescript`. Default
   * url to downloaded TypeScript in a brower's web worker or main thread is
   * from `https://cdn.jsdelivr.net/npm/`.
   */
  typescriptPath?: string;
  /**
   * Create a source map. Using `inline` will inline the source map into the
   * code, otherwise the source map will be in the returned `map` property.
   * Default is `true`.
   */
  sourceMap?: boolean | 'inline';
  /**
   * Base directory to resolve non-relative module names. Same as the `baseUrl`
   * TypeScript compiler option: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
   */
  baseUrl?: string;
  /**
   * List of path mapping entries for module names to locations relative to the `baseUrl`.
   * Same as the `baseUrl` TypeScript compiler option:
   * https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
   */
  paths?: { [key: string]: string[] };

  sys?: CompilerSystem;
}

export type CompileTarget = 'latest' | 'esnext' | 'es2020' | 'es2019' | 'es2018' | 'es2017' | 'es2015' | 'es5' | string | undefined;

export interface TranspileResults {
  code: string;
  data?: any[];
  diagnostics: Diagnostic[];
  imports?: { path: string }[];
  inputFileExtension: string;
  inputFilePath: string;
  map: any;
  outputFilePath: string;
}

export interface TransformOptions {
  coreImportPath: string;
  componentExport: 'lazy' | 'module' | 'customelement' | null;
  componentMetadata: 'runtimestatic' | 'compilerstatic' | null;
  currentDirectory: string;
  file?: string;
  isolatedModules?: boolean;
  module?: 'cjs' | 'esm';
  proxy: 'defineproperty' | null;
  style: 'static' | null;
  target?: string;
}

export interface CompileScriptMinifyOptions {
  target?: CompileTarget;
  pretty?: boolean;
}

export interface DevServer extends BuildEmitEvents {
  address: string;
  basePath: string;
  browserUrl: string;
  protocol: string;
  port: number;
  root: string;
  close(): Promise<void>;
}

export interface CliInitOptions {
  args: string[];
  logger: Logger;
  sys: CompilerSystem;
}
