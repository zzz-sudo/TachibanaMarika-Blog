---
layout: single
title: "文献精读 | Raygun：用蛋白语言模型实现模板蛋白的缩小、改造与扩增"
date: 2025-03-17
categories:
  - AI蛋白设计
tags:
  - protein language model
  - protein design
  - Raygun
  - ESM-2
  - template-guided design
toc: true
---

> **核心速递：**Raygun 将可变长度蛋白序列编码为固定长度概率分布，使蛋白语言模型不仅能理解蛋白序列，还能在保留模板结构和功能线索的前提下进行可控的缩短、扩增和大规模序列编辑。

## 1. 论文基本信息

- **Title**: Miniaturizing, Modifying, and Magnifying Nature's Proteins with Raygun
- **Journal**: bioRxiv
- **First Author**: Kapil Devkota
- **领域定位**: AI 蛋白设计 / 蛋白语言模型 / 模板引导生成 / 分子工具工程

这篇 bioRxiv 预印本提出了一个名为 Raygun 的生成式 AI 框架，目标是解决模板蛋白设计中一个长期存在的难题：如何在不完全重头设计蛋白的情况下，对已有蛋白进行大幅度、可控且尽量功能保真的改造。

传统蛋白工程常见策略是点突变，即在少数氨基酸位点上做 substitution。但自然演化远不止点突变。天然蛋白的长期演化包含 coordinated substitutions、insertions 和 deletions，也就是在保留核心结构和功能的同时，不断增删局部序列、重塑结构片段和调节功能表面。Raygun 的核心问题正是：能不能让蛋白语言模型参与这种更接近自然演化的模板引导设计？

## 2. 研究背景与痛点

近年来，蛋白设计领域快速发展，尤其是 de novo protein design 已经能够根据结构或功能约束生成全新蛋白。然而，许多实际应用并不一定需要从零开始创造一个分子。更常见的需求是改造已有蛋白：把荧光蛋白做小以减少融合标签对目标蛋白的干扰，把酶或 reporter 改造成更适合递送的版本，或者在天然 ligand 的基础上增强 binding affinity。

这类任务可以称为 template-guided design。它的优势是设计起点已经位于可折叠、可表达、可能具备功能的蛋白空间中，因此比完全从零探索更稳健。但问题也很明显：如果只允许点突变，设计空间会迅速爆炸，而且无法模拟自然演化中大量存在的 indels。对于蛋白 miniaturization、domain removal、motif insertion 或 length expansion 等任务，不能处理插入和删除几乎就是一个硬限制。

蛋白语言模型为这个问题提供了新入口。ESM-2 等模型能够把每个氨基酸残基表示为包含局部和全局上下文的 embedding，捕捉进化保守性、结构倾向和功能约束。但是 PLM embedding 的长度随蛋白长度变化：一个长度为 n 的蛋白对应 n 个 residue embeddings。只要长度不同，表示空间维度就不同，这使得跨长度采样和直接生成 indels 变得困难。

Raygun 的核心创新就是把“可变长度蛋白”转化为“固定长度概率表示”。一旦所有蛋白都能进入同一个固定长度空间，就可以在该空间中采样、加噪、改变目标长度，再解码回具体氨基酸序列。这样，模板蛋白设计就从离散序列空间中的组合搜索，转化为连续概率空间中的可控生成。

## 3. 核心材料与方法

Raygun 使用 ESM-2 650M 作为基础蛋白语言模型。输入蛋白序列首先被转换为 per-residue embeddings，每个残基对应一个 1,280 维表示。随后，Raygun 的 encoder 将这个可变长度 embedding 序列压缩成固定长度概率表示；decoder 再根据该表示和指定目标长度生成新的可变长度 embedding，并最终转换为氨基酸序列。

具体来说，论文将长度不小于 50 的蛋白表示为一个 64,000 维 multivariate normal distribution。这个表示可以理解为 50 个固定 segment，每个 segment 对应 1,280 维参数。作者从 central limit theorem 获得启发：把可变长度蛋白划分为若干 segment 后，每个 segment 的 embedding 聚合可近似建模为概率分布。这样，蛋白不再只是高维空间中的一个点，而是一个可以采样的分布。

Raygun 架构由两个关键 length-transforming layers 组成：Reduction 和 Repetition。Reduction 层把可变长度 embedding 压缩为固定长度的 mean 和 standard deviation 表示；Repetition 层则接收目标长度，将固定长度表示展开为指定长度的 embedding 序列。T-Block 是模型中的主要参数模块，Raygun 总参数量约 701 million。

训练上，作者将 Raygun 构造成自监督 autoencoder。模型需要把输入蛋白编码为固定长度表示，再解码回原始长度，并通过预训练 ESM-2 decoder 转回 amino acid logits。训练目标包括 reconstruction 以及固定长度空间中的 self-consistency，使得生成序列重新编码后仍接近原始模板表示。方法部分显示，模型基于 SwissProt 过滤后的约 103,463 条序列进行训练/验证划分，并在 6 张 A100 GPU 上训练 15 epochs。

推理时，Raygun 由两个直观参数控制：target length 决定输出蛋白长度，noise 控制从 MVN 分布采样的扰动强度，大致对应 substitution rate。长度变化负责 indels，noise 负责序列多样化。生成后，作者使用 ESM-2 pseudo-loglikelihood、HMMER domain retention、AlphaFold-3 结构预测、pLDDT、TM-score 和 ProTrek 等方法进行候选过滤或评估。

## 4. 关键发现与机制解析

### 4.1 固定长度概率表示让 indel-aware 设计成为可能

Raygun 最重要的思想不是简单调用 PLM 生成序列，而是重新定义了蛋白表示方式。传统 PLM embedding 随序列长度变化，因此很难在一个统一空间中直接处理缩短、扩增和大规模 indels。Raygun 通过 50 个 segment 的固定长度概率编码，使不同长度蛋白进入同一类潜在空间。

这带来两个直接好处。第一，设计者可以直接指定输出长度，从而把 miniaturization 和 magnification 变成模型参数，而不是后处理操作。第二，模型能够在保留模板整体表示的同时引入序列扰动，避免每次都从头探索一个完全未知的蛋白空间。

### 4.2 Raygun 在计算评估中兼顾结构保真与序列多样性

作者首先在多类蛋白模板上测试 Raygun 的长度编辑能力。结果显示，在约 10% 的长度缩放范围内，多数蛋白仍能保持相对可接受的预测结构指标。论文报告，在许多情况下，蛋白可缩短或拉长约 10%，同时保持较高 TM-score；对于更剧烈的长度变化，pLDDT 和 TM-score 会下降，但模型仍能产生结构上有吸引力的候选。

Raygun 的 single-shot generation 也是一大优势。论文称其在 NVIDIA A100 GPU 上每轮生成约 0.3 秒，约比 EvoDiff 快 100-fold。速度本身很重要，因为蛋白设计通常不是生成一个候选就结束，而是需要产生大量候选，再经过多层过滤筛出少数可实验验证对象。

在与 EvoDiff 的 masking comparison 中，Raygun 在相同扰动水平下表现出更好的结构预测指标，并能在保持 pLDDT 或 TM-score 的同时提供更高序列多样性。这说明 Raygun 的模板引导策略更像“从天然蛋白流形出发，沿着可行空间移动”，而不是从远离可行蛋白的区域重新逼近。

### 4.3 Raygun 能相对保留功能位点和 PFAM domain

蛋白设计中的结构保真并不等同于功能保真。因此作者进一步评估了 Raygun 对功能位点和 domain 信息的保留能力。

在 UniProt 中带有 active sites 和 binding sites 注释的 10,000 个蛋白上，作者比较了功能位点保留率与总体序列保留率，发现 Raygun 在 miniaturization 过程中相对更倾向保留 active/binding sites。这个结果说明模型并非随机删除残基，而可能从 PLM embedding 中继承了部分功能约束信息。

在 PFAM domain 测试中，作者覆盖四类主要结构类别，并在 50%-200% 原始长度范围内生成候选。平均来看，约 48.25% 候选保留对应 PFAM domain。这不是完美保真，但对于包含显著长度变化的无监督或弱监督生成任务而言，说明 Raygun 具备一定跨 fold、跨 domain 的泛化潜力。

### 4.4 实验验证显示 Raygun 能生成可表达、部分有功能的蛋白变体

论文最有说服力的部分来自实验验证。作者首先选择 eGFP 和 mCherry 两个常用 fluorescent protein templates，使用 Raygun 生成 miniaturized candidates。每个模板生成并过滤约 70,000 个样本，最终选择 8 个候选进行实验测试。结果显示，5 个候选具有显著荧光，其中两个 mCherry-derived candidates 长度为 199 和 206 amino acids，短于 FPbase 中约 96% 的 fluorescent proteins。

第二个验证对象是 TurboID。TurboID 是一种常用 synthetic biotin ligase，但体积较大可能影响融合蛋白功能。作者生成约 500,000 个 TurboID candidates，并筛出 11 个进行细胞实验。结果显示 6 个候选能在 HEK cells 中表达，其中 2 个保留 biotin ligase activity。值得注意的是，Raygun 生成的一个高度缩短候选能够去除 DNA-binding domain 并成功表达，但其 ligase activity 不足，说明结构稳定和表达成功并不自动等于功能充分保留。

第三个案例是 EGF/EGFR binding。作者以 EGF 为模板，生成扩增后的 EGF variants，并利用 ProTrek 等功能相关打分筛选候选。4 个进入实验测试的 EGF-Raygun candidates 全部成功表达，其中 EGF-Raygun-1 和 EGF-Raygun-2 与 EGFR 的 binding affinity 强于 wildtype EGF。论文报告其 K<sub>D</sub> 分别为 0.274 µmol/L 和 0.561 µmol/L，而 wildtype EGF 为 0.759 µmol/L。

这些实验说明 Raygun 不只是计算指标好看，而能在若干真实蛋白工程任务中产生可测试、可表达、部分功能保留或增强的候选。不过这些结果也同时提醒：功能筛选仍然不可替代，尤其是对高度工程化或非天然功能而言。

## 5. 局限性与未来展望

Raygun 的概念很漂亮，但仍有几个边界需要清楚看待。首先，这是一篇 bioRxiv 预印本，尚未经过同行评议。其方法、实验设计和结论仍需要进一步外部验证。

其次，许多大规模结论依赖 pLDDT、TM-score、PFAM retention 和 PLM likelihood 等计算指标。这些指标对于结构 plausibility 和 domain 保留有参考价值，但不能完全代表真实功能。TurboID 案例尤其说明，候选可以表达、结构预测也可接受，但活性仍可能不足。

第三，Raygun 目前更像一个强大的候选生成器，而不是端到端功能优化器。对于 fluorescent proteins 这类高度工程化功能，候选虽然发光但亮度偏低，仍需要 directed evolution 或功能特异实验数据继续优化。对于 binder design，EGF 案例表现亮眼，但该结果是否能推广到更复杂的 protein-protein interface 仍需要更多验证。

未来的发展方向很清楚。其一，将 Raygun 与更强的 PLM 结合，例如 ESM-3、SaProt 或结构感知模型。其二，引入功能预测器、实验反馈和 active learning，让模型不仅保持可折叠性，还能朝具体活性优化。其三，把 domain-level editing、motif insertion、linker redesign 和 delivery-size constraint 等真实应用场景做成更明确的任务约束。

## 6. 核心思考与研究启发

Raygun 的方法论价值在于，它把蛋白设计中的“长度变化”从麻烦的离散问题转化为可控的生成参数。许多生物序列模型擅长处理 fixed-length 或近似 fixed-length 表示，但真实生物分子经常存在长度变化、结构域重排和局部片段插入删除。Raygun 提供了一个有启发性的思路：先把可变长度对象映射到固定长度概率空间，再通过采样和解码回到可变长度序列。

这种思路对模板引导设计尤其有价值。de novo design 追求从无到有，而 template-guided design 更像在已有功能分子的可行空间附近探索。Raygun 的优势就在于它从天然或已工程化蛋白出发，尽量保持在可折叠、可表达的分子流形附近，同时通过 noise 和 target length 拉开与模板的距离。这种“靠近已知可行解，但不被模板完全锁死”的策略，可能比完全无约束生成更适合很多工程场景。

从工程流程看，Raygun 也展示了现代 AI 生物设计的典型闭环：预训练模型提供基础表示，生成模型提出候选，多层计算过滤压缩搜索空间，最后用少量实验验证真实功能。真正的价值并不只在模型本身，而在这条流水线是否能把数十万候选压缩成可实验测试的少数候选，并保持足够命中率。

这篇文章还提醒了一个重要问题：结构相似性和功能优化之间并没有简单等号。PLM 捕捉到的进化规则有助于保持 foldability 和部分功能位点，但对于人造 reporter、酶活增强或特定 binding task，仍然需要功能特异的评价函数和实验闭环。未来 AI 蛋白设计的关键，可能不是单个模型“全能”，而是生成模型、结构模型、功能模型和实验筛选的组合效率。

因此，Raygun 最值得记住的不是某一个具体候选，而是一个设计范式：把已有蛋白模板编码成可采样的概率对象，在固定长度潜在空间中进行可控扰动，再回到可实验验证的氨基酸序列。这一范式把蛋白语言模型从“读懂蛋白”推进到“编辑蛋白”，也为分子工具 miniaturization、功能模块重构和治疗蛋白优化提供了新的计算入口。
