---
layout: single
title: "文献精读 | Nicheformer：打通单细胞与空间组学壁垒的多模态基础模型"
date: 2025-10-30
categories: 
  - 单细胞与空间组学
tags: 
  - Foundation Model
  - Spatial Transcriptomics
  - Transformer
  - Representation Learning
  - scRNA-seq
toc: true
---

> **核心速递 :** Nicheformer 是首个基于 1.1 亿海量离体单细胞与空间转录组数据联合预训练的 Transformer 基础模型，它突破性地实现了仅依靠基因表达谱就能预测细胞的空间微环境，从而将丢失的“空间上下文”重新赋予传统的单细胞测序数据。

## 1. 论文基本信息
- **Title**: Nicheformer: a foundation model for single-cell and spatial omics
- **Journal**: Nature Methods (2025)
- **First Author**: Alejandro Tejada-Lapuerta, Anna C. Schaar
- **领域定位**: 单细胞与空间组学 / 深度学习算法 / 基础模型 (Foundation Model)

## 2. 研究背景与痛点 
在单细胞基因组学领域，研究人员面临着一个经典的“鱼与熊掌”难题：
1. **常规单细胞 RNA 测序 (scRNA-seq)**：具有极高的基因检测深度，能够全面揭示细胞异质性，但由于需要将组织解离，**细胞的物理空间微环境信息（如细胞间通讯、组织生态位）在实验过程中彻底丢失**。
2. **空间转录组学 (Spatial Transcriptomics, 如 MERFISH、Xenium、CosMx)**：完美保留了原位空间信息，但受限于技术瓶颈，通常只能靶向检测几百到数千个基因，特征空间有限。

近年来，虽然涌现了如 scGPT、Geneformer 等单细胞基础模型，但它们**几乎全部依赖于离体解离的单细胞数据进行预训练**，模型在学习过程中完全感知不到细胞的“空间邻居”是谁。Nicheformer 的诞生正是为了打破这一模态壁垒，通过超大规模的联合预训练，让模型在浩瀚的表达谱数据中自主学习到基因表达与空间结构之间的隐式映射关系。

## 3. 核心材料与方法 
Nicheformer 的架构设计兼顾了生物学意义与深度学习的工程优雅：

- **超大规模多模态语料库 (SpatialCorpus-110M)**：
  作者构建了迄今为止最庞大的联合数据集，包含 5,706 万个解离单细胞和 5,380 万个空间解析细胞，横跨人类和小鼠的 73 种不同组织。为解决跨物种整合问题，研究团队使用 BioMart 映射了同源基因，构建了包含 20,310 个基因的统一词汇表（Token 库）。

- **基于相对表达秩的特征工程 (Rank-based Tokenization)**：
  不同测序平台（如 10x 与 MERFISH）存在巨大的系统性偏差。为消除这种技术批次效应，Nicheformer 放弃了直接输入绝对表达量，而是先计算特定技术的非零均值向量进行归一化，随后**将细胞内表达的基因按表达量从高到低排序**。模型只关心“哪些基因排在前面”，截断长度设为 1,500 个 Token。

- **上下文 Token 注入 (Contextual Tokens)**：
  在每个细胞的基因序列最前端，模型强制加入了 `<ASSAY>`（测序技术）、`<MODALITY>`（空间或离体模态）和 `<ORGANISM>`（物种）三个元数据 Token。这种设计让 Transformer 能够在注意力机制中自适应地感知数据的来源背景。

- **Transformer 网络架构与预训练**：
  模型采用 12 层 Transformer Encoder，16 个注意力头，隐藏层维度 512，总参数量约为 4,930 万。训练任务采用掩码语言建模 (Masked Language Modeling, MLM)，随机 Mask 掉 15% 的 Token 并让模型预测它们。

## 4. 关键发现与机制解析 

### 4.1 惊艳的“空间标签”零样本/微调预测能力
在多个大型独立测试集（如小鼠大脑 MERFISH、人类肝脏/肺部 CosMx）上，Nicheformer 仅凭基因表达谱，就能精准预测细胞的**空间生态位 (Niche)**、**组织区域 (Region)** 以及**局部细胞密度 (Cell density)**。其性能（如 F1 Score 和 MSE）全面碾压了仅用离体数据训练的 scGPT、Geneformer 以及经典的降维算法（PCA、scVI）。

### 4.2 注意力机制 (Attention) 捕获了真实的生物学性别差异
作者打开了 Transformer 的“黑盒”，发现模型的注意力层级具有明显的分工：中间层高度关注特定基因的相互作用，而最后几层则将注意力集中在 `<MODALITY>` 等上下文 Token 上。更有趣的是，在分析小鼠大脑下丘脑前腹侧周核 (AVPV，已知存在性别差异的区域) 时，模型的第 9 和第 10 层注意力头能够自主识别出与性别二态性高度相关的基因（如 <i>Igf2</i>、<i>Th</i>），证明模型真正学到了潜在的生物学调控网络。

### 4.3 跨模态降维打击：为 scRNA-seq 重新赋予“空间坐标”
这是该模型最具应用潜力的发现。作者将纯解离测序的小鼠运动皮层 scRNA-seq 数据输入到微调好的 Nicheformer 中，模型成功为这些“无家可归”的离体细胞精准分配了空间上的 Niche 和 Region 标签。这证实了空间转录组学挖掘出的空间上下文关系，可以通过 Foundation Model 完美逆向迁移到普通的单细胞数据中。

## 5. 局限性与未来展望
尽管性能卓越，作者也坦诚了 Nicheformer 目前的局限：
1. **预训练未直接融入物理坐标**：目前的预训练过程是纯基于基因表达的掩码预测，没有将空间转录组学中的物理坐标 (x, y) 转换为图神经网络 (GNN) 等拓扑结构输入。未来如果引入图注意力机制 (Graph Attention)，模型的空间感知力有望进一步突破。
2. **元数据 Token 的“范数爆炸”陷阱**：在提取细胞 Embedding 进行下游线性探针 (Linear Probing) 任务时，研究人员发现必须手动剔除 `<MODALITY>` 等上下文 Token。因为这些 Token 在模型最后几层的 L2 范数 (Norm) 异常高，如果用 Mean Pooling 将其强行聚合，会严重污染细胞的表征向量。

## 6. 核心思考与研究启发

阅读完 Nicheformer 的架构设计，对于我们日常的科研算法开发和系统级生信平台构建有几个非常直接的启发：

1. **鲁棒的特征工程往往大道至简**
   在面对多组学、跨平台的异质性数据清洗时，我们常纠结于使用各种复杂的批次矫正算法（如 Harmony、Seurat CCA）。但 Nicheformer 证明了，**基于排序的 Token 化 (Rank-based Encoding)** 是一种极度稳健的策略。在后续挖掘时，我们完全可以借鉴这种“只关注相对表达次序，忽略绝对 count 值”的思路，这对于应对组学数据的高 Dropout 噪声有奇效。

2. **Embedding 提取时的“防坑”策略**
   文中提到的上下文 Token 导致“范数爆炸（Norm Explosion）”是一个非常经典的深度学习工程陷阱（视觉 Transformer 中也常出现类似背景 Token 干扰问题）。在未来调用各类大语言模型或基因组 Foundation Model 提取高维表征（Embedding）进行 UMAP 降维或聚类时，必须仔细检查各维度特征向量的 L2 Norm，必要时引入特征截断或选择性丢弃注意力集中的控制类 Token，以免聚类结果被元数据偏差所绑架。

3. **与生信自动化平台的无缝集成潜力**
   Nicheformer 展现了强大的 Linear Probing（线性探针）能力——这意味着我们不需要每次都对庞大的底层大模型进行全参微调。在前后端分离的生信自动化平台架构（如 Vue + Spring Boot）设计中，我们完全可以将 Nicheformer 作为底层的静态推理服务（API 化），前端用户上传常规 scRNA-seq 矩阵后，后端通过轻量级的线性分类器即可秒级返回预测的“空间分布概率图”。这为我们构建智能化、高并发的组学云平台提供了极具商业/科研价值的功能扩展思路。