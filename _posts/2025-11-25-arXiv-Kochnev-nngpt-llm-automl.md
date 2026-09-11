---
layout: single
title: "文献精读 | NNGPT：用大语言模型重思 AutoML"
date: 2025-11-25
categories:
  - 大模型与智能体架构
tags:
  - nngpt
  - arXiv
  - 大模型与智能体架构
toc: true
---

> **核心速递：** NNGPT 把 LLM 变成生成、验证和改进神经网络的 AutoML 引擎。

## 1. 论文基本信息
- **Title**: NNGPT: Rethinking AutoML with Large Language Models
- **Journal**: arXiv
- **First Author**: Roman Kochnev
- **领域定位**: 大模型与智能体架构 / 技术工具

## 2. 研究背景与痛点

传统 AutoML 依赖搜索算法和大量试验。LLM 具备代码生成和架构描述能力，但要成为 AutoML 引擎，必须闭环验证并从结果中学习。

## 3. 核心材料与方法

NNGPT 整合五条流水线：zero-shot architecture synthesis、HPO、code-aware accuracy/early-stop prediction、NN-RAG 和 reinforcement learning。系统生成网络、预处理和超参数，执行后把结果回写。

## 4. 关键发现与机制解析

### 4.1 核心结论一

LLM 可作为自改进 AutoML 引擎，生成并验证神经网络架构。

### 4.2 核心结论二

NN-RAG、3-shot prompting、hash 去重和 code-aware predictor 共同降低无效试验。

### 4.3 核心结论三

HPO RMSE 0.60 优于 Optuna 0.64，code-aware predictor RMSE 0.14 且 Pearson r=0.78。

## 5. 局限性与未来展望

主要聚焦视觉网络，生物组学模型迁移需重新定义搜索空间、指标和约束。 后续使用这类方法时，还需要关注数据来源、benchmark 设置、跨任务泛化和真实应用中的失败案例。对于 arXiv 预印本，也应持续跟踪正式发表版本、代码发布状态和社区复现情况。

## 6. 核心思考与研究启发

公开方法论启发在于，LLM 自动化不应停留在代码生成，而要形成生成、运行、评估、去重和反馈学习的闭环。面向科研建模时，可复现指标和失败样本记录同样重要。
