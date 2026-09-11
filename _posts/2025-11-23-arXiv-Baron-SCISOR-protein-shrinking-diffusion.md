---
layout: single
title: "文献精读 | 用离散扩散模型缩短蛋白并尽量维持功能"
date: 2025-11-23
categories:
  - AI蛋白设计
tags:
  - SCISOR
  - protein-design
  - discrete-diffusion
  - ProteinGym
  - ESM2
toc: true
---

> **核心速递：** SCISOR 将蛋白缩短设计改写为“从随机插入噪声中学习删除”的离散扩散过程，使模型能在保持自然序列特征的同时规划多位点 deletion。

## 1. 论文基本信息
- **Title**: A Diffusion Model to Shrink Proteins While Maintaining Their Function
- **Journal**: arXiv
- **First Author**: Ethan Baron
- **领域定位**: AI 蛋白设计 / 离散扩散模型 / 蛋白序列可控编辑

## 2. 研究背景与痛点

许多蛋白在药物递送、细胞内融合表达和生物工程构建中都会遇到同一个现实限制：序列太长。长蛋白往往更难合成、包装、递送和工程化。传统缩短策略通常依赖寻找天然短同源物、基于结构知识手工删除片段，或通过大规模实验筛选反复优化。这些做法成本高，且常常只适用于少数结构和功能机制清楚的蛋白。

蛋白语言模型和生成模型提供了另一条路径：从自然蛋白序列的大规模数据库中学习进化约束，再搜索一个更短但仍像自然蛋白的子序列。然而，蛋白缩短不是普通生成任务。给定长度为 L 的蛋白，删除 M 个残基会形成巨大的组合空间；普通 autoregressive 或 masked language model 可以给序列打分，却不擅长高效规划多步删除。已有蛋白扩散模型通常建模 substitution 或 masking，也缺少直接学习 deletion 的归纳偏置。

SCISOR 的核心动机正是补上这一空缺：让模型不是事后筛选短序列，而是在训练目标中直接学习“哪些字符应被删除”。

## 3. 核心材料与方法

SCISOR 的全称是 Sequence Contraction with InSertion-Only noising pRocess。它采用一个看似反直觉但很聪明的设定：前向噪声过程不是删除自然蛋白，而是向自然蛋白随机插入氨基酸；反向生成过程则学习删除这些插入字符，逐步回到自然序列。这样，模型在训练时天然学习“删除哪些位置会让序列更像自然蛋白”。

方法上，作者使用 pure birth process 作为 insertion-only noising process。给定自然蛋白序列 X0，前向过程在随机时间点插入随机氨基酸，生成更长的 Xt。反向 denoiser 需要在给定 Xt 和插入数量 M 的情况下，预测上一步应删除哪个字符。为了计算训练目标，作者将 X0 与 Xt 的所有可能 alignment 纳入考虑，并用动态规划并行计算每个候选删除位点的目标概率。

模型架构上，SCISOR 复用 ESM2 这类 BERT-style protein language model 的预训练权重，将最后一层替换为用于删除位置预测的 linear 和 softmax 层。为了让模型感知目标缩短幅度，作者在 attention blocks 之间加入 FiLM layers，把待删除数量 M 作为条件变量注入模型。

工程上，长蛋白训练会带来严重的 padding 和显存问题。作者采用按 Xt 长度排序、子批次累计梯度、超过 2048 长度时随机窗口裁剪等策略，让模型能扩展到 UniRef 级别数据。公开信息显示，SCISOR small、medium、large 分别约为 35M、150M、650M 参数，并在 UniRef50 和 UniRef90 上训练。

## 4. 关键发现与机制解析

### 4.1 SCISOR 把蛋白缩短变成可学习的删除规划

普通蛋白语言模型可以估计一个短序列是否自然，但很难在海量子序列组合中找到合适删除集合。SCISOR 则把“删除”作为反向扩散动作：模型每一步都预测哪个残基最像噪声插入，从而把多步缩短问题转化为序贯规划问题。更重要的是，模型条件化于 M，因此在删除 5%、20% 或 50% 序列时，可以形成不同的删除策略。

### 4.2 生成质量与自然序列分布匹配具有竞争力

在 UniRef50 生成评估中，SCISOR 与 EvoDiff、DPLM 以及 autoregressive references 进行比较。作者使用 perplexity、Fréchet protein distance 和 OmegaFold pLDDT 衡量模型拟合、样本分布和可折叠性。结果显示，SCISOR 在扩散模型中达到有竞争力的 perplexity，并且生成样本在分布匹配和 pLDDT 上表现较好。

### 4.3 deletion 功能效应预测达到模型族领先表现

作者在 ProteinGym deletion benchmark 中评估 SCISOR。该评估包含约 7000 个 deletion effect measurements 和 62 个 assays，并区分 single deletion 与 multiple deletion。SCISOR 与 ProGen2、Tranception、HMM、PoET 等模型比较。图 5 汇总显示，SCISOR 的最高表现变体在 single deletion 与 multiple deletion 两类任务上都达到领先的 Spearman correlation。附录表格也提示，不同模型尺寸表现差异明显，因此应将结论理解为最佳变体层面的优势，而不是所有 SCISOR 尺寸都全面领先。

### 4.4 缩短蛋白时更能保留结构与功能位点

在蛋白缩短实验中，作者选择 200 条带 active site 或 binding site 注释的 UniProt 序列，按 1%、3%、5%、10%、20%、30%、40%、50% 等比例缩短，并与 Raygun 和 ProGen2 对比。评估指标包括 OmegaFold pLDDT、原始与缩短蛋白的 TM/RMSD、以及功能位点 enrichment。结果显示，SCISOR 更稳定地保留可折叠性、结构拓扑和功能位点。RalA/GTP binding site 的个案分析进一步展示了 SCISOR 在关键结合位点结构保留上的优势。

## 5. 局限性与未来展望

SCISOR 的核心限制是它目前只做 deletion。真实蛋白工程中，删除片段后常常需要补偿性 substitution 或 insertion 来恢复局部结构、相互作用界面或稳定性。作者也明确指出，未来可以把 substitution 与 insertion 纳入前向过程，让 denoiser 在更丰富的编辑空间中规划。

第二个限制是“像自然蛋白”不等同于“保持原功能”。两个序列相似且都自然存在，功能也可能不同，尤其在多功能蛋白家族中更明显。因此，把 SCISOR 用于具体设计时，最好接入功能分类器、结构约束、多聚体界面评估，最终仍需实验验证。

第三，本文的缩短效果主要由计算指标支撑，例如 ProteinGym、OmegaFold、pLDDT、结构相似性和功能位点保留。湿实验验证文中未说明，因此它更适合作为方法学突破和候选生成器，而不是直接替代实验筛选。

## 6. 核心思考与研究启发

SCISOR 最值得借鉴的地方，不只是“用扩散模型做蛋白设计”，而是它把目标操作写进了噪声过程。很多 AI 生物学任务容易停留在“先生成，再筛选”的范式里；SCISOR 提醒我们，如果任务本质是删除、插入、替换、压缩或重排，就应该让训练过程直接学习这种操作的统计规律。

对序列设计而言，这种思想可以扩展到更广泛的可控编辑：蛋白片段压缩、功能 motif 保留、结构域边界优化、linker 设计、甚至多目标约束下的候选库生成。一个实用工作流可以是：先用 SCISOR 类模型生成短序列候选，再用结构预测、功能分类器、保守性分析和实验可制造性指标做多级筛选。

对组学和生信算法开发而言，它也提供了一个更抽象的方法论启发：当目标是从高维对象中保留关键结构时，可以把“保留什么、删去什么”的规则设计成模型训练任务，而不是只依赖后处理。例如特征选择、marker panel 压缩、空间邻域特征筛选、细胞状态扰动模拟，都可以借鉴这种“操作即模型目标”的设计思想。
