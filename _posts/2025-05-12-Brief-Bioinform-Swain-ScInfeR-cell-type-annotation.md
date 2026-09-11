---
layout: single
title: "文献精读 | ScInfeR：面向单细胞、ATAC 与空间组学的细胞类型注释框架"
date: 2025-05-12
categories:
  - 生信平台与软件工程
tags:
  - ScInfeR
  - cell annotation
  - scRNA-seq
  - scATAC-seq
  - spatial omics
toc: true
---

> **核心速递：**ScInfeR 将 reference-based annotation 与 marker-based annotation 结合起来，并扩展到 scRNA-seq、scATAC-seq 和 spatial omics，为细胞类型注释提供了一个多证据融合框架。

## 1. 论文基本信息
- **Title**: ScInfeR: an efficient method for annotating cell types and sub-types in single-cell RNA-seq, ATAC-seq, and spatial omics
- **Journal**: Briefings in Bioinformatics
- **First Author**: Asish Kumar Swain
- **领域定位**: 单细胞注释工具 / 空间组学分析 / 生信数据库与软件

## 2. 研究背景与痛点

细胞类型注释是单细胞和空间组学分析中的关键步骤。常见方法大致分为两类：reference-based 方法依赖已注释 scRNA-seq 参考数据，marker-based 方法依赖预定义 marker gene sets。二者都有短板：参考数据可能缺失或批次差异明显，marker 可能不完整、不特异，且不同组织和物种之间可迁移性有限。

随着 scATAC-seq 和 spatial transcriptomics 的普及，注释问题变得更复杂。scATAC-seq 提供的是 chromatin accessibility 信号，空间组学还包含坐标和邻域关系。单一 RNA reference 或单一 marker list 很难覆盖这些数据形态。

## 3. 核心材料与方法

ScInfeR 是一个 graph-based cell-type annotation method。它同时使用 scRNA-seq references 和 marker sets，把两类证据整合到注释流程中。方法采用受 message-passing layers 启发的层级框架，先识别 broad cell types，再进一步推断 subtypes。

对 scATAC-seq，ScInfeR 利用 chromatin accessibility 数据；对 spatial transcriptomics，方法纳入 spatial coordinate information。它还支持 weighted positive and negative markers，使用户能够表达某些 marker 对细胞类型判断的重要性或排除性。

作者同时构建了 ScInfeRDB，这是一个 curated database，包含 329 个 cell types、2497 个 gene markers 和 28 个 tissue types，覆盖 human 和 plant。benchmark 部分比较了 10 个现有工具，在 100 多个 cell-type prediction tasks 中评估表现。

## 4. 关键发现与机制解析

### 4.1 多证据融合优于单一注释来源

ScInfeR 的出发点很务实：reference 和 marker 都有价值，也都有偏差。将二者结合，可以减少单一来源缺失或错误带来的注释风险。这对参考图谱不足的场景尤其重要。

### 4.2 层级注释更符合细胞类型结构

细胞类型通常不是扁平类别，而是具有层级结构。先判断大类，再判断亚型，可以降低复杂分类任务的难度，也更符合实际生物学命名习惯。

### 4.3 跨模态注释需要利用数据特有信息

ScInfeR 不只处理 scRNA-seq，也尝试适配 scATAC-seq 和 spatial omics。对不同模态使用不同信息，例如 chromatin accessibility 和 spatial coordinates，使注释流程更接近多模态组学的真实需求。

## 5. 局限性与未来展望

ScInfeR 的效果仍然依赖参考集和 marker 数据库质量。对于新物种、新组织或发育阶段特异细胞状态，如果参考库缺乏对应信息，自动注释仍需要人工校正。植物数据尤其需要持续扩充 marker 和 reference，才能提高作物体系中的可迁移性。

未来细胞注释工具需要进一步整合空间邻域、基因调控网络、同源基因关系和跨物种 marker 映射。对于复杂作物和多倍体基因组，单纯的人类/动物参考思路并不够，需要专门的植物细胞注释资源。

## 6. 核心思考与研究启发

ScInfeR 的重要启发是，细胞注释不应该是一键式黑箱，而应当是多证据整合。reference、marker、空间位置、染色质开放性和人工知识都应成为注释证据链的一部分。

对单细胞分析实践而言，ScInfeR 这类方法更适合作为半自动注释框架：它提供初步标签和层级结构，但最终仍需结合 marker 表达、空间分布、发育逻辑和文献证据进行复核。高质量注释不是工具输出的终点，而是后续轨迹分析、通讯分析和机制解释的地基。
