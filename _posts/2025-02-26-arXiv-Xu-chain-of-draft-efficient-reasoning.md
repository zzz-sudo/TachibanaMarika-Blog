---
layout: single
title: "文献精读 | Chain of Draft：用更少文字更快推理"
date: 2025-02-26
categories:
  - 大模型与智能体架构
tags:
  - chain
  - arXiv
  - 大模型与智能体架构
toc: true
---

> **核心速递：** CoD 用简洁中间草稿替代冗长 CoT，在保持准确率的同时显著降低 token 成本。

## 1. 论文基本信息
- **Title**: Chain of Draft: Thinking Faster by Writing Less
- **Journal**: arXiv
- **First Author**: Silei Xu
- **领域定位**: 大模型与智能体架构 / 关键方法论

## 2. 研究背景与痛点

Chain-of-Thought 提升了复杂推理表现，但输出冗长，带来成本、延迟和噪声。人类做草稿时常只写关键变量和中间结论，而不是完整自然语言解释。

## 3. 核心材料与方法

Chain of Draft 要求模型生成 minimalistic yet informative intermediate reasoning，只保留必要信息。作者在多类推理任务上比较 CoD 与 CoT 的准确率、token 数和延迟。

## 4. 关键发现与机制解析

### 4.1 核心结论一

CoD 可在多类推理任务中匹配或超过 CoT 准确率。

### 4.2 核心结论二

简洁中间草稿显著降低 token 成本和延迟，最低只需 CoT 7.6% tokens。

### 4.3 核心结论三

推理提示不一定越长越好，关键是保留必要状态和决策点。

## 5. 局限性与未来展望

过度压缩可能损失可审计性；高风险科研推理仍需保留完整证据链。 后续使用这类方法时，还需要关注数据来源、benchmark 设置、跨任务泛化和真实应用中的失败案例。对于 arXiv 预印本，也应持续跟踪正式发表版本、代码发布状态和社区复现情况。

## 6. 核心思考与研究启发

公开方法论启发在于，AI 工作流可以采用分层推理：常规批处理用短草稿提高效率，关键结论再展开完整解释和证据链。这样能兼顾规模化处理和可审计性。
