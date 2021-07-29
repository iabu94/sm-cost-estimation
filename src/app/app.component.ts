import { Component, OnInit } from '@angular/core';

interface Field {
  code: string;
  name: string;
  price: number;
}

interface Cost {
  id: number;
  title: string;
  titleType: 'Label' | 'Input';
  units: number;
  base: number;
  calculatedPrice: number;
}

interface Allocation {
  id: number;
  title: string;
  percentage: number;
  calculatedPrice: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  feePrecentage = 0.0;
  newCostId = 5;

  costDetails: Cost[] = [];
  revenueAllocations: Allocation[] = [];
  labourAllocations: Allocation[] = [];
  totalCost = 0;
  totalCostPlusFee = 0;
  totalRevenueAllocation = 0;
  totalLabourAllocation = 0;
  totalOverall = 0;

  constructor() {}

  ngOnInit(): void {
    this.setupCostDetails();
    this.setupRevenueBasedAllocations();
    this.setupLabourBasedAllocations();
  }

  getRowTotalCost(cost: Cost) {
    const index = this.costDetails.findIndex((c) => c.id === cost.id);
    const calculatedPrice = cost.base * cost.units;
    this.costDetails[index].calculatedPrice = calculatedPrice;
    return calculatedPrice;
  }

  getTotalCost() {
    this.totalCost = this.costDetails.reduce(
      (sum, current) => sum + current.calculatedPrice,
      0
    );
  }

  getTotalCostPlusFee() {
    this.totalCostPlusFee = this.totalCost * (1 + +this.feePrecentage);
  }

  getRowTotalRevenueAllocation(allocation: Allocation) {
    const index = this.revenueAllocations.findIndex(
      (a) => a.id === allocation.id
    );
    const calculatedPrice = this.totalCostPlusFee * allocation.percentage;
    this.revenueAllocations[index].calculatedPrice = calculatedPrice;
    return calculatedPrice;
  }

  getTotalRevenueAllocation() {
    this.totalRevenueAllocation = this.revenueAllocations.reduce(
      (sum, current) => sum + current.calculatedPrice,
      0
    );
  }

  getRowTotalLabourAllocation(allocation: Allocation) {
    const index = this.labourAllocations.findIndex(
      (a) => a.id === allocation.id
    );
    const labour = this.costDetails[0];
    const calculatedPrice = labour.units * labour.base * allocation.percentage;
    this.labourAllocations[index].calculatedPrice = calculatedPrice;
    return calculatedPrice;
  }

  getTotalLabourAllocation() {
    this.totalLabourAllocation = this.labourAllocations.reduce(
      (sum, current) => sum + current.calculatedPrice,
      0
    );
  }

  getOverallTotal() {
    this.totalOverall =
      this.totalCostPlusFee +
      this.totalRevenueAllocation +
      this.totalLabourAllocation;
  }

  keyUp() {
    this.getTotalCost();
    this.getTotalCostPlusFee();
    this.getTotalRevenueAllocation();
    this.getTotalLabourAllocation();
    this.getOverallTotal();
  }

  fieldArray: Array<Field> = [];
  newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index: number) {
    this.fieldArray.splice(index, 1);
  }

  addNewRow() {
    this.newCostId++;
    const newRow: Cost = {
      id: this.newCostId,
      title: '',
      titleType: 'Input',
      units: 0,
      base: 0,
      calculatedPrice: 0,
    };
    this.costDetails = [...this.costDetails, newRow];
  }

  setupCostDetails() {
    this.costDetails = [
      {
        id: 1,
        title: 'Labor:',
        titleType: 'Label',
        units: 0,
        base: 0,
        calculatedPrice: 0,
      },
      {
        id: 2,
        title: 'Material:',
        titleType: 'Label',
        units: 0,
        base: 0,
        calculatedPrice: 0,
      },
      {
        id: 3,
        title: 'Equipment:',
        titleType: 'Label',
        units: 0,
        base: 0,
        calculatedPrice: 0,
      },
      {
        id: 4,
        title: 'Subcontract:',
        titleType: 'Label',
        units: 0,
        base: 0,
        calculatedPrice: 0,
      },
    ];
  }

  setupLabourBasedAllocations() {
    const laborCost = this.costDetails[0];
    this.labourAllocations = [
      {
        id: 1,
        title: 'Small Tools',
        percentage: 0.055,
        calculatedPrice: laborCost.units * laborCost.base * 0.055,
      },
      {
        id: 2,
        title: 'Safety Awards',
        percentage: 0.025,
        calculatedPrice: laborCost.units * laborCost.base * 0.025,
      },
      {
        id: 3,
        title: 'Fringe Benefits',
        percentage: 0.18,
        calculatedPrice: laborCost.units * laborCost.base * 0.18,
      },
    ];
  }

  setupRevenueBasedAllocations() {
    this.revenueAllocations = [
      {
        id: 1,
        title: 'Umbrella& Pollution Insurance:',
        percentage: 0.0021,
        calculatedPrice: 0,
      },
      {
        id: 2,
        title: 'AGC Job Cost:',
        percentage: 0.000142,
        calculatedPrice: 0,
      },
      {
        id: 3,
        title: 'General Liability:',
        percentage: 0.002696,
        calculatedPrice: 0,
      },
      {
        id: 4,
        title: 'Safety Director:',
        percentage: 0.001,
        calculatedPrice: 0,
      },
      {
        id: 5,
        title: 'Data Processing:',
        percentage: 0.0084,
        calculatedPrice: 0,
      },
    ];
  }
}
