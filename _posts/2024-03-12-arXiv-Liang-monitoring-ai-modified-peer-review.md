---
layout: single
title: "文献精读 | 大规模监测 AI 修改文本：以 AI 会议审稿为例"
date: 2024-03-12
categories:
  - 宏观综述
tags:
  - monitoring
  - arXiv
  - 宏观综述
toc: true
---

> **核心速递：** 该研究用语料级方法估计 AI 修改文本在学术审稿中的比例，显示 LLM 已影响科研交流实践。

## 1. 论文基本信息
- **Title**: Monitoring AI-Modified Content at Scale: A Case Study on the Impact of ChatGPT on AI Conference Peer Reviews
- **Journal**: arXiv
- **First Author**: Weixin Liang
- **领域定位**: 宏观综述 / 技术工具

## 2. 研究背景与痛点

ChatGPT 发布后，学术写作和同行评审中的 AI 使用迅速增加，但单篇文本检测误差高且容易造成误伤。研究者需要更稳健地监测群体层面的变化。

## 3. 核心材料与方法

作者构建最大似然语料模型，利用专家文本和 AI 生成参考文本估计大型语料中 substantially modified 文本比例，并分析这些文本与 reviewer confidence、deadline 和 rebuttal 行为的关系。

## 4. 关键发现与机制解析

### 4.1 核心结论一

AI 会议审稿中可能已有显著比例文本被 LLM 深度修改或生成。

### 4.2 核心结论二

LLM 使用比例在低 confidence、临近 deadline、较少回应 rebuttal 的 reviewer 中更高。

### 4.3 核心结论三

语料级趋势可能比单条文本检测更可靠，也更适合观察知识实践变化。

## 5. 局限性与未来展望

方法估计的是群体比例，不适合指控单个文本；AI 文本风格随模型变化可能漂移。 后续使用这类方法时，还需要关注数据来源、benchmark 设置、跨任务泛化和真实应用中的失败案例。对于 arXiv 预印本，也应持续跟踪正式发表版本、代码发布状态和社区复现情况。

## 6. 核心思考与研究启发

公开方法论启发在于，AI 使用治理应更多关注透明性、群体趋势和责任边界，而不是只依赖单篇检测。科研写作中，AI 可以辅助表达，但关键判断和证据链仍应由研究者负责。
