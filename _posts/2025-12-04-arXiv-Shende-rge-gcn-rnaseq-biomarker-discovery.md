---
layout: single
title: "文献精读 | RGE-GCN：RNA-seq 早癌检测的递归基因消除"
date: 2025-12-04
categories:
  - 生信平台与软件工程
tags:
  - rge
  - arXiv
  - 生信平台与软件工程
toc: true
---

> **核心速递：** RGE-GCN 用图卷积网络和递归基因消除从 RNA-seq 中筛选可解释 biomarker。

## 1. 论文基本信息
- **Title**: RGE-GCN: Recursive Gene Elimination with Graph Convolutional Networks for RNA-seq based Early Cancer Detection
- **Journal**: arXiv
- **First Author**: Shreyas Shende
- **领域定位**: 生信平台与软件工程 / 关键方法论

## 2. 研究背景与痛点

RNA-seq 早癌检测面临高维、噪声和基因间关系复杂等问题。传统差异分析方法常以单基因为单位，难以充分利用基因关系结构。

## 3. 核心材料与方法

RGE-GCN 先从基因表达构建图，用 GCN 区分 cancer 与 normal，再用 Integrated Gradients 为基因打分。低相关基因被递归移除，直到得到紧凑且预测性强的 biomarker set。

## 4. 关键发现与机制解析

### 4.1 核心结论一

RGE-GCN 将特征选择和分类整合进同一 RNA-seq 分析 pipeline。

### 4.2 核心结论二

在合成和真实癌症队列中，方法相对 DESeq2、edgeR、limma-voom 获得更高 accuracy 和 F1-score。

### 4.3 核心结论三

筛选基因与 PI3K-AKT、MAPK、SUMOylation 和 immune regulation 等癌症相关通路一致。

## 5. 局限性与未来展望

预印本且摘要未给出样本量；癌症检测结论需独立队列和临床验证。 后续使用这类方法时，还需要关注数据来源、benchmark 设置、跨任务泛化和真实应用中的失败案例。对于 arXiv 预印本，也应持续跟踪正式发表版本、代码发布状态和社区复现情况。

## 6. 核心思考与研究启发

公开方法论启发在于，高维表达数据建模可以把预测性能和可解释筛选放在同一流程内。图结构、归因方法和递归剔除应与通路富集、外部队列验证共同使用。
