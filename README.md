# d-finite.github.io

Personal academic homepage built with static HTML and CSS for GitHub Pages.

Research links use local brand SVGs and `github-stars.js`. A Code link with
`data-github-repo="owner/repository"` loads its star count from GitHub's public API.
Counts are cached for 15 minutes and refreshed while the page is visible. If a
request fails, the last cached count stays visible; without a cache, the link
remains `Code`. No API token or build step is needed.

OpenWAM's authors, links, and overview figure come from its [official project page](https://openwam-official.github.io/).
Its hover figure, `images/works/openwam/infra.png`, is rendered from the supplied `infra.pdf`.
GroundingPI's authors, links, and architecture figure come from its [official project page](https://groundingpi.github.io/).
Its teaser is rendered from `figures/teaser.pdf` in the [arXiv v1 source](https://arxiv.org/src/2609.39601v1), matching Figure 1 on the paper's first page.
Its author-role symbols are mapped to this homepage's legend († corresponding author, ‡ project lead).
The arXiv mark comes from [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/arxiv.svg),
the GitHub mark from [GitHub Octicons](https://github.com/primer/octicons/blob/main/icons/mark-github-16.svg),
and the Hugging Face logo from its [brand assets](https://huggingface.co/brand).
The Project Page globe uses the original color asset from
[Microsoft Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons/blob/main/assets/Globe/SVG/ic_fluent_globe_24_color.svg)
under the [MIT license](assets/files/icon/fluent-LICENSE.txt).
