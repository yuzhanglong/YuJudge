/*
 * File: htmlExternalWebpackPlugin.ts
 * Description: 向HTML模板注入指定的 external CDN
 * Created: 2020-11-29 00:17:13
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import {Compiler} from "webpack";


interface HtmlTag {
  attributes: {
    [attributeName: string]: string | boolean;
  };
  tagName: string;
  innerHTML?: string;
  voidTag: boolean;
}

interface Assets {
  headTags: HtmlTag[];
  bodyTags: HtmlTag[];
}


class HtmlExternalWebpackPlugin {
  htmlWebpackPlugin: HtmlExternalWebpackPlugin | null = null;
  scriptSources: string[] = [];

  constructor(htmlWebpackPlugin: HtmlExternalWebpackPlugin, scriptSources: string[]) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.scriptSources = scriptSources;
  }

  generateTags(scriptSources: string[]): HtmlTag[] {
    return scriptSources.map((res) => {
      return {
        tagName: 'script',
        voidTag: false,
        attributes: {
          "src": res,
        }
      };
    });
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('htmlExternalWebpackPlugin', compilation => {
      if (this.htmlWebpackPlugin) {
        // @ts-ignore
        const hooks = this.htmlWebpackPlugin.getHooks(compilation);
        hooks.alterAssetTagGroups.tap('htmlExternalWebpackPlugin', (assets: Assets) => {
          assets.headTags = [...this.generateTags(this.scriptSources), ...assets.headTags];
        });
      }
    });
  }
}

module.exports = HtmlExternalWebpackPlugin;
