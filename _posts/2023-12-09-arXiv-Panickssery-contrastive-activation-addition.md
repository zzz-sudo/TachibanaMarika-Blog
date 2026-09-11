---
layout: single
title: "文献精读 | CAA：通过对比激活加法转向 Llama 2"
date: 2023-12-09
categories:
  - 大模型与智能体架构
tags:
  - contrastive
  - arXiv
  - 大模型与智能体架构
toc: true
---

> **核心速递：** CAA 展示了无需改权重即可通过激活向量控制 LLM 高层行为。

## 1. 论文基本信息
- **Title**: Steering Llama 2 via Contrastive Activation Addition
- **Journal**: arXiv
- **First Author**: Nina Panickssery
- **领域定位**: 大模型与智能体架构 / 关键方法论

## 2. 研究背景与痛点

提示词和微调都能改变模型行为，但提示词不稳定，微调成本较高且难以解释。Activation steering 试图直接在模型内部表示空间中找到行为方向。

## 3. 核心材料与方法

CAA 通过正负样例对计算 residual stream 激活差，并平均得到 steering vector。推理时将该向量加到 prompt 后的位置，使用正负系数控制行为增强或抑制。

## 4. 关键发现与机制解析

### 4.1 核心结论一

CAA 可在推理时显著改变 Llama 2 Chat 的目标行为。

### 4.2 核心结论二

该方法可与 fine-tuning 和 system prompt 叠加，并且能力损失较小。

### 4.3 核心结论三

steering vector 同时提供了关于高层概念如何在激活空间表示的解释窗口。

## 5. 局限性与未来展望

steering 效果依赖样例构造、层选择和系数；行为控制可能出现副作用或过度转向。 后续使用这类方法时，还需要关注数据来源、benchmark 设置、跨任务泛化和真实应用中的失败案例。对于 arXiv 预印本，也应持续跟踪正式发表版本、代码发布状态和社区复现情况。

## 6. 核心思考与研究启发

公开方法论启发在于，模型行为控制可以发生在表示层而非只发生在文本层。面向专业应用时，可将真实性、谨慎性、拒绝编造和格式一致性设计成可测试的 steering 目标。
