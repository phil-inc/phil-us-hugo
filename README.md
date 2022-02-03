# Phil Marketing Website

Phil Website (https://phil.us) using [Hugo](https://gohugo.io/).

## Development

Install Hugo (https://gohugo.io/getting-started/installing/), clone this repository and run:

```
hugo serve
```

This will run a server and listen for changes. Any change to the files will trigger a rebuild.

To display draft contents:

```
hugo serve -D
```

To enable full re-render on change:

```
hugo server -D --disableFastRender
```

## Adding content

### Adding page

```
hugo new privacy.md
```

This will create `content/privacy.md`. The file's content will be in markdown format. The url will be https://phil.us/privacy.

The page can also be in html format.

```
hugo new privacy.html
```

### Adding Press Release

```
hugo new press-releases/news-title.md
```

The url will be at https://phil.us/press-releases/news-title. The list of press releases will be at https://phil.us/press-releases.


## Layouts

Home page is rendered using `layouts/index.html`.

Default layout is in `layouts/_default` folder. 

- `baseof.html` - the base html
- `single.html` - template for single page. eg, single press release content
- `list.html` - template to render list of content. eg, list of press releases

The `partials` folder contains partial snippets that can be used in other html.

If any page requires a different layout, it can be specified in the meta in the page content. eg, `content/manufacturers.md`:

```
---
title: "Manufacturers"
type: manufacturers
---
```

This page will use the template under `layouts/manufacturers`.

