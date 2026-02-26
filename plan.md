# D-Finite 个人主页搭建计划书

## 项目目标
搭建个人学术主页 d-finite.github.io，采用：
- **排版布局**：参考 jonbarron.github.io（居中单列布局，表格结构）
- **设计风格**：参考 Claude/Anthropic 网站（现代 sans-serif 字体、柔和配色、流畅动画）
- **技术栈**：纯静态 HTML + CSS，托管在 GitHub Pages

## 设计规范

### 字体方案（Claude 风格）
- **主字体**：Inter / -apple-system / sans-serif
- **代码字体**：'SF Mono' / 'Monaco' / monospace
- **大小层级**：14px (正文) / 16px (标题) / 22-28px (h2)

### 配色方案（Claude 风格）
- **主色调**：`#191919` (深灰文字) / `#f5f5f5` (浅灰背景)
- **强调色**：`#DA7756` (橙棕色，用于悬停和高亮)
- **链接色**：`#2E5F8F` (柔和蓝色，比 jonbarron 的更柔和)
- **边框色**：`#e0e0e0` (浅灰)

### 动画效果（Claude 风格）
- **过渡时间**：0.2-0.3s (链接悬停、图片切换)
- **缓动函数**：ease-out / ease-in-out
- **交互反馈**：hover 颜色变化、subtle 阴影、平滑滚动

### 布局规范（jonbarron 风格）
- **页面宽度**：max-width: 800px, 居中
- **个人信息**：头像右侧，简介左侧（37% / 63%）
- **论文列表**：左侧缩略图（25%），右侧内容（75%）
- **响应式**：< 768px 时垂直堆叠

## 任务执行规范

**每个任务完成后，Agent 必须**：
1. 修改任务的完成标志：`[ ]` → `[x]`
2. 执行指定的 git commit 命令
3. 汇报完成情况（说明创建/修改了哪些文件）
4. 根据检查标准自行验证任务完成质量
5. 列出检查结果（通过 ✓ 或失败 ✗）

**遇到需要人类补充的信息时**：
- 使用占位符完成初始搭建（如 "Your Name", "placeholder.jpg"）
- 在完成汇报中明确列出需要人类补充的项目
- 提供详细的补充说明书（见文档末尾的"人类信息补充指南"）
- 不要因缺少真实信息而中断任务执行

---

## 搭建任务清单

### 1. 初始化项目结构
**任务内容**：
- 创建目录：`images/`, `data/`
- 初始化 Git 仓库：`git init`
- 创建 `.gitignore`, `README.md`
- 在 GitHub 创建 `d-finite.github.io` 仓库并关联

**完成标志**：[x]  
**完成后操作**：`git add -A && git commit -m "chore: initialize project structure"`

**完成汇报模板**：
```
已完成任务 1：初始化项目结构
- 创建目录：images/, data/
- 创建文件：.gitignore, README.md
- Git 状态：已初始化，已关联远程仓库 [仓库 URL]
```

**检查标准**（Agent 必须自行验证）：
- [ ] `images/` 和 `data/` 目录存在
- [ ] `.gitignore` 包含常见忽略项（.DS_Store, *.log 等）
- [ ] `README.md` 包含项目标题和简介
- [ ] `git status` 显示仓库已初始化
- [ ] `git remote -v` 显示已关联 GitHub 仓库

---

### 2. 创建 CSS 样式表
**任务内容**：
- 创建 `stylesheet.css`
- 引入 Inter 字体（Google Fonts 或系统字体栈）
- 设置全局样式：body, a, h2, table
- 实现 Claude 配色方案和动画效果
- 参考 jonbarron 的 `.papertitle`, `.name`, `.highlight` 类

**关键样式**：
```css
body { font-family: Inter, -apple-system, sans-serif; color: #191919; }
a { color: #2E5F8F; transition: color 0.2s ease-out; }
a:hover { color: #DA7756; }
```

**完成标志**：[x]  
**完成后操作**：`git add stylesheet.css && git commit -m "feat: add stylesheet with Claude-inspired design"`

**完成汇报模板**：
```
已完成任务 2：创建 CSS 样式表
- 创建文件：stylesheet.css (XX 行)
- 包含样式：字体、配色、动画、布局
- 关键类：.name, .papertitle, .highlight, [其他]
```

**检查标准**（Agent 必须自行验证）：
- [ ] `stylesheet.css` 文件存在且语法正确
- [ ] 主色调符合要求：文字 #191919，链接 #2E5F8F，hover #DA7756
- [ ] 包含 Inter 字体声明（font-family）
- [ ] 所有 transition 时间为 0.2-0.3s
- [ ] 包含 `.name`, `.papertitle`, `.highlight` 类定义
- [ ] 用浏览器打开测试页面，确认样式生效

---

### 3. 搭建 HTML 基础框架
**任务内容**：
- 创建 `index.html`
- 设置 meta 标签（charset, viewport, author）
- 引入 `stylesheet.css`
- 创建 jonbarron 风格的表格布局结构
- 添加占位符内容

**完成标志**：[x]  
**完成后操作**：`git add index.html && git commit -m "feat: create HTML structure with table layout"`

**完成汇报模板**：
```
已完成任务 3：搭建 HTML 基础框架
- 创建文件：index.html
- 页面标题：[标题内容]
- 布局结构：嵌套表格，max-width: 800px
```

**检查标准**（Agent 必须自行验证）：
- [ ] `index.html` 文件存在且 HTML 语法正确
- [ ] 包含 `<meta charset="UTF-8">` 和 viewport 标签
- [ ] 正确引入 `stylesheet.css`
- [ ] 使用嵌套 table 布局，max-width: 800px
- [ ] 在浏览器中打开显示正常，无控制台错误
- [ ] HTML 验证工具检查无警告

---

### 4. 实现个人信息模块
**任务内容**：
- 添加个人姓名（居中，大字体）
- 添加个人简介段落（研究方向、单位等）
- 添加头像占位符（圆形，右侧布局）
- 添加联系方式链接栏：Email / GitHub / Google Scholar / CV

**布局参考**：jonbarron index.html 第 19-42 行的结构

**完成标志**：[x]  
**完成后操作**：`git add index.html && git commit -m "feat: add personal info section"`

**完成汇报模板**：
```
已完成任务 4：实现个人信息模块
- 修改文件：index.html
- 添加内容：姓名、简介、头像、联系方式
- 链接数量：[X] 个（Email、GitHub 等）
```

**检查标准**（Agent 必须自行验证）：
- [ ] 姓名使用 `.name` 类，居中显示
- [ ] 布局为左文字（63%）右头像（37%）
- [ ] 头像使用 `border-radius: 50%` 实现圆形
- [ ] 至少包含 4 个联系方式链接
- [ ] 在浏览器中查看，布局与 jonbarron 风格一致
- [ ] 所有链接颜色符合配色方案

---

### 5. 实现研究内容模块
**任务内容**：
- 添加 "Research" 标题和简介
- 创建论文/项目条目模板（带缩略图、悬停效果）
- 实现图片切换动画（onmouseover/onmouseout）
- 添加 2-3 个示例项目占位符
- 设置论文标题、作者、链接格式

**动画参考**：jonbarron index.html 第 53-69 行的 JavaScript

**完成标志**：[ ]  
**完成后操作**：`git add index.html && git commit -m "feat: add research section with hover animations"`

**完成汇报模板**：
```
已完成任务 5：实现研究内容模块
- 修改文件：index.html, stylesheet.css（如有样式调整）
- 添加内容：Research 标题、[X] 个项目条目
- 动画效果：鼠标悬停图片切换
```

**检查标准**（Agent 必须自行验证）：
- [ ] 包含 "Research" 标题（h2 标签）
- [ ] 至少 2 个论文/项目条目
- [ ] 每个条目左侧 20% 缩略图，右侧 80% 内容
- [ ] 鼠标悬停时图片切换动画正常工作
- [ ] 使用 `.papertitle` 类设置论文标题样式
- [ ] 在浏览器测试悬停效果流畅（0.2s 过渡）

---

### 6. 响应式适配和优化
**任务内容**：
- 添加 CSS media queries（< 768px）
- 移动端：图片和文字垂直堆叠
- 调整移动端字体大小和间距
- 测试不同屏幕尺寸显示效果

**完成标志**：[ ]  
**完成后操作**：`git add stylesheet.css && git commit -m "feat: add responsive design for mobile"`

**完成汇报模板**：
```
已完成任务 6：响应式适配和优化
- 修改文件：stylesheet.css
- 添加内容：@media 查询规则
- 断点设置：max-width: 768px
```

**检查标准**（Agent 必须自行验证）：
- [ ] `stylesheet.css` 包含 `@media (max-width: 768px)` 规则
- [ ] 移动端布局：头像和文字垂直堆叠，宽度 100%
- [ ] 移动端字体和间距适当调整
- [ ] 使用浏览器开发者工具模拟手机屏幕（375px 宽度）
- [ ] 移动端显示正常，无横向滚动条
- [ ] 所有文字可读，按钮/链接易于点击

---

### 7. 部署到 GitHub Pages
**任务内容**：
- 推送代码到 GitHub：`git push -u origin main`
- 在仓库 Settings → Pages 启用 GitHub Pages
- 设置分支为 `main`，目录为 `/ (root)`
- 访问 `https://d-finite.github.io` 验证

**完成标志**：[ ]  
**完成后操作**：`git tag v1.0 && git push --tags` (标记第一版)

**完成汇报模板**：
```
已完成任务 7：部署到 GitHub Pages
- 推送状态：成功推送至 GitHub
- Pages 状态：已启用，分支 main
- 网站地址：https://d-finite.github.io
- 版本标签：v1.0
```

**检查标准**（Agent 必须自行验证）：
- [ ] `git push` 成功，无错误
- [ ] GitHub 仓库可见，包含所有文件
- [ ] Settings → Pages 显示 "Your site is live at..."
- [ ] 访问 https://d-finite.github.io 显示正确内容
- [ ] 样式加载正常，无 404 错误
- [ ] 所有链接和悬停效果正常工作
- [ ] 使用手机或开发者工具测试移动端显示

---

## 实现提示

### 从 jonbarron 参考的关键要素
1. **HTML 结构**：嵌套 table 布局（虽然老式但简单有效）
2. **CSS 类名**：`.name`, `.papertitle`, `.highlight`
3. **图片切换**：使用两层 div + JavaScript 控制 opacity
4. **论文布局**：左图右文，`onmouseout`/`onmouseover` 触发动画

### Claude 风格的关键差异
1. **字体**：用 Inter 替代 Lato（更现代）
2. **配色**：更柔和的蓝色和橙色，避免过于鲜艳
3. **动画**：更快的过渡时间 (0.2s vs 0.3s)，更 subtle
4. **细节**：增加 letter-spacing, line-height 提升可读性

### 开发建议
- 先完成基础框架后再填充真实内容
- 使用浏览器开发者工具实时调试样式
- 每个任务完成后立即 commit，保持清晰的版本历史
- 占位符使用 Lorem Ipsum 或简短的示例文本

## 进度追踪
- **开始时间**：2026-02-26
- **当前进度**：0/7 任务完成
- **Git 状态**：未初始化

---

## Agent 执行须知

**本计划为后续 agent 执行提供详细指导，包含所有必要的设计规范、代码示例和操作步骤。**

### 强制要求：

1. **严格按照任务顺序执行**（1→2→3→4→5→6→7）

2. **每个任务完成后必须执行以下步骤**：
   - ✅ 修改 plan.md 中对应任务的完成标志：`[ ]` → `[x]`
   - ✅ 执行指定的 git commit 命令
   - ✅ 按照"完成汇报模板"格式汇报完成情况
   - ✅ **逐项检查"检查标准"，并列出每项的通过/失败状态**
   - ✅ 如有检查项失败，必须先修复再进入下一任务

3. **检查标准验证方式**：
   - 文件存在性：使用 `ls` 或 `list_dir` 工具
   - 文件内容：使用 `read_file` 或 `grep_search` 检查关键代码
   - Git 状态：运行 `git status`, `git log`, `git remote -v`
   - 浏览器测试：描述在浏览器中验证的结果
   - 样式效果：说明具体的视觉效果和交互行为

4. **汇报格式示例**：
   ```
   ========================================
   任务 X 完成汇报
   ========================================
   
   【完成内容】
   - 创建/修改的文件：xxx.html, xxx.css
   - 添加的功能：xxx
   - Git commit: "commit message"
   
   【检查结果】
   ✓ 检查项 1：通过（说明）
   ✓ 检查项 2：通过（说明）
   ✗ 检查项 3：失败（需要修复...）
   ✓ 检查项 4：通过（说明）
   
   【下一步】
   进入任务 X+1 / 修复失败项
   ========================================
   ```

5. **禁止行为**：
   - ❌ 跳过任何检查标准
   - ❌ 未汇报就进入下一任务
   - ❌ 不按顺序执行任务
   - ❌ 检查项失败但继续执行

### 质量保证：
- 所有 HTML 必须语法正确，可在浏览器正常显示
- 所有 CSS 必须符合指定的配色方案和动画规范
- Git commit message 必须遵循 conventional commits 格式
- 代码必须清晰易读，适当添加注释

**目标：完成一个可部署的、高质量的个人主页，每一步都经过严格验证。**